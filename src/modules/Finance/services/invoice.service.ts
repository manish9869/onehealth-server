import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateInvoiceDto, UpdateInvoiceDto } from "../dto/invoice.dto";
import { Prisma } from "@prisma/client";
import ejs from "ejs";
import { ConnectionService } from "../../../config/connection.service";
import Messages from "../../../common/constants";

const PuppeteerHTMLPDF = require("puppeteer-html-pdf");

const htmlPDF = new PuppeteerHTMLPDF();
htmlPDF.setOptions({
  format: "A4",
  scale: 1.5,
  printBackground: true,
});

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: ConnectionService) {}

  async createInvoice(data: CreateInvoiceDto, uuid: string, userId: number) {
    try {
      const invoice = await this.prisma.invoice.create({
        data: {
          ...data,
          invoiceNumber: uuid,
          created_user_id: userId,
          updated_user_id: userId,
        },
      });
      return invoice;
    } catch (error) {
      throw new HttpException(
        `Failed to create invoice: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getInvoiceById(invoiceId: number) {
    try {
      const invoice = await this.prisma.invoice.findUnique({
        where: { invoice_id: invoiceId },
        include: {
          customer: true, // Include customer details
          caseHistory: {
            // Include related case history
            include: {
              staff_member: true, // Include staff member details
              case_treatments: {
                include: {
                  treatment: true, // Include treatment details
                },
              },
              case_medicines: {
                include: {
                  medicine: true, // Include medicine details
                },
              },
              case_conditions: {
                include: {
                  medical_condition: {
                    include: {
                      symptoms: true, // Include symptoms for the medical condition
                    },
                  },
                },
              },
              case_documents: true, // Include documents related to the case history
            },
          },
          // Add any other relevant includes if there are additional related entities
        },
      });

      if (!invoice) {
        throw new HttpException("Invoice not found", HttpStatus.NOT_FOUND);
      }
      return invoice;
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve invoice: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllInvoices() {
    try {
      return await this.prisma.invoice.findMany({
        include: {
          customer: true,
          caseHistory: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve invoices: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllInvoicesByCaseId(caseId: number) {
    try {
      return await this.prisma.invoice.findMany({
        where: { case_id: caseId },
        include: {
          customer: true,
          caseHistory: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve invoices for case ID ${caseId}: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getPastPaymentsByCustomerId(caseId: number) {
    return await this.prisma.invoice.findMany({
      where: {
        case_id: caseId,
      },
      orderBy: {
        issueDate: "desc", // Order by issue date to get the most recent first
      },
    });
  }

  async updateInvoice(
    invoiceId: number,
    data: UpdateInvoiceDto,
    userId: number
  ) {
    try {
      const invoice = await this.prisma.invoice.update({
        where: { invoice_id: invoiceId },
        data: {
          ...data,
          updated_user_id: userId,
        },
      });
      return invoice;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpException(
          "Invoice not found for update",
          HttpStatus.NOT_FOUND
        );
      }
      throw new HttpException(
        `Failed to update invoice: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteInvoice(invoiceId: number) {
    try {
      await this.prisma.invoice.delete({
        where: { invoice_id: invoiceId },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpException(
          "Invoice not found for deletion",
          HttpStatus.NOT_FOUND
        );
      }
      throw new HttpException(
        `Failed to delete invoice: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async downloadInvoice(invoiceId: number) {
    try {
      const htmlPDF = new PuppeteerHTMLPDF();
      htmlPDF.setOptions({
        format: "A4",
        scale: 1.5,
        printBackground: true,
      });
      const data: any = await this.getInvoiceById(invoiceId); // Assume this method exists

      if (!data) throw new Error(Messages.NO_DATA);

      const html = await htmlPDF.readFile(
        __dirname + "./../../../templates/invoice.ejs",
        "utf8"
      );

      const renderedData = {
        date: new Date(data.issueDate).toDateString(),
        invoiceNumber: data.invoiceNumber,
        senderName: data.customer.fullname, // Accessing customer details directly
        senderContact: data.customer.mobile, // Accessing customer mobile directly
        receiverName: data.caseHistory.staff_member.fullname, // Accessing staff member details from caseHistory
        receiverContact: data.caseHistory.staff_member.mobile, // Accessing staff member mobile directly
        treatments: data.caseHistory.case_treatments.map((treatment: any) => ({
          name: treatment.treatment.name, // Accessing treatment name directly from nested object
          cost: `$ ${parseFloat(treatment.treatment.cost).toFixed(2)}/-`, // Accessing treatment cost directly from nested object
        })),
        medicalConditions: data.caseHistory.case_conditions.map(
          (condition: any) => ({
            name: condition.medical_condition.name, // Accessing medical condition name from nested object
          })
        ),
        medicines: data.caseHistory.case_medicines.map((medicine: any) => ({
          name: medicine.medicine.name, // Accessing medicine name from nested object
        })),
        subTotal: `$ ${parseFloat(data.totalAmount.toString()).toFixed(2)}`,
        tax: `${parseFloat(data.tax).toFixed(2)}`,
        discount: `${parseFloat(data.discount).toFixed(2)}`,
        totaltaxAmount: `$ ${parseFloat(data.totaltaxAmount).toFixed(2)}`,
        totalDiscountAmount: `$ ${parseFloat(data.totalDiscountAmount).toFixed(2)}`,
        totalAmount: `$ ${parseFloat(data.totalAmount).toFixed(2)}`,
        paidAmount: `$ ${parseFloat(data.amountPaid).toFixed(2)}`,
        amountDue: `$ ${parseFloat(data.pendingAmount).toFixed(2)}`,
        paymentMode: data.paymentMode,
        note: "An invoice is a formal document requesting payment for goods or services, detailing the transaction, payment terms, and parties involved.",
      };

      const renderedHtml = ejs.render(html, renderedData);

      const pdfBuffer = await htmlPDF.create(renderedHtml);

      return pdfBuffer; // Return the PDF buffer
    } catch (error) {
      throw new HttpException(
        `Failed to download invoice: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async emailInvoiceWithAttachment(data: any) {
    const html = await htmlPDF.readFile(
      __dirname + "./../../../templates/emailInvoice.ejs",
      "utf8"
    );

    const renderedData = {
      date: new Date(data.issueDate).toDateString(),
      invoiceNumber: data.invoiceNumber,
      receiverName: data.customer.fullname, // Accessing staff member details from caseHistory
      receiverContact: data.customer.mobile, // Accessing staff member mobile directly
      receiverAddress: data.customer.address,
      treatments: data.caseHistory.case_treatments.map((treatment: any) => ({
        name: treatment.treatment.name, // Accessing treatment name directly from nested object
        cost: `$ ${parseFloat(treatment.treatment.cost).toFixed(2)}/-`, // Accessing treatment cost directly from nested object
      })),

      subTotal: `$ ${parseFloat(data.totalAmount.toString()).toFixed(2)}`,
      tax: `${parseFloat(data.tax).toFixed(2)}`,
      discount: `${parseFloat(data.discount).toFixed(2)}`,
      totaltaxAmount: `$ ${parseFloat(data.totaltaxAmount).toFixed(2)}`,
      totalDiscountAmount: `$ ${parseFloat(data.totalDiscountAmount).toFixed(2)}`,
      totalAmount: `$ ${parseFloat(data.totalAmount).toFixed(2)}`,
      paidAmount: `$ ${parseFloat(data.amountPaid).toFixed(2)}`,
      amountDue: `$ ${parseFloat(data.pendingAmount).toFixed(2)}`,
      paymentMode: data.paymentMode,
      dueDate: data.dueDate,
    };

    const renderedHtml = ejs.render(html, renderedData);

    return renderedHtml;
  }
}
