import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { CreateInvoiceDto, UpdateInvoiceDto } from "../dto/invoice.dto";
import { InvoiceService } from "../services/invoice.service";
import { v4 as uuidv4 } from "uuid";
import { AuthGuard } from "../../Auth/auth.guard";
import { AuthenticatedRequest } from "../../Auth/auth-request.interface";
import { EmailService } from "src/modules/Email/email.service";

@Controller("invoice")
@UseGuards(AuthGuard)
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly emailService: EmailService
  ) { }

  @Post()
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<void> {
    try {
      const userId = req.loggedInUser;

      const invoice = await this.invoiceService.createInvoice(
        createInvoiceDto,
        uuidv4(),
        userId
      );
      res.status(HttpStatus.CREATED).json({
        status: "success",
        data: invoice,
        message: "Invoice created successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to create invoice: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const invoices = await this.invoiceService.getAllInvoices();
      res.status(HttpStatus.OK).json({
        status: "success",
        data: invoices,
        message: "Invoices fetched successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to fetch invoices: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async findOne(
    @Param("id") invoiceId: number,
    @Res() res: Response
  ): Promise<void> {
    try {
      const invoice = await this.invoiceService.getInvoiceById(invoiceId);
      res.status(HttpStatus.OK).json({
        status: "success",
        data: invoice,
        message: "Invoice fetched successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to fetch invoice: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("download/:id")
  async downloadInvoice(@Param("id") invoiceId: number, @Res() res: Response) {
    try {
      const pdfBuffer = await this.invoiceService.downloadInvoice(invoiceId);

      const fileName = `invoice_${invoiceId}.pdf`;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`
      );
      res.send(pdfBuffer);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("send-email/:id")
  async sendEmail(
    @Param("id") invoiceId: number,
    @Res() res: Response
  ): Promise<void> {
    try {
      const data: any = await this.invoiceService.getInvoiceById(invoiceId);

      if (!data) {
        throw new HttpException("Invoice not found", HttpStatus.NOT_FOUND);
      }
      const emailHtml =
        await this.invoiceService.emailInvoiceWithAttachment(data);
      const pdfBuffer = await this.invoiceService.downloadInvoice(invoiceId);

      // Prepare email data
      const emailDTO = {
        recipients: [data.customer.email],
        subject: `Invoice #${invoiceId}`,
        html: emailHtml,
        attachments: [
          {
            filename: `invoice_${invoiceId}.pdf`,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      };
      // Send email
      await this.emailService.sendEmail(emailDTO);
      res.status(HttpStatus.CREATED).json({
        status: "success",
        message: "Invoice Sent successfully",
      });
    } catch (error) {
      throw new HttpException(
        "Failed to send email",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("case/:caseId")
  async findAllByCaseId(
    @Param("caseId") caseId: number,
    @Res() res: Response
  ): Promise<void> {
    try {
      const invoices = await this.invoiceService.getAllInvoicesByCaseId(caseId);
      res.status(HttpStatus.OK).json({
        status: "success",
        data: invoices,
        message: "Invoices by case ID fetched successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to fetch invoices by case ID: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("past-payments/:caseId")
  async getPastPaymentsByCustomerId(
    @Param("caseId") caseId: number,
    @Res() res: Response
  ): Promise<void> {
    try {
      const pastPayments =
        await this.invoiceService.getPastPaymentsByCustomerId(caseId);
      res.status(HttpStatus.OK).json({
        status: "success",
        data: pastPayments,
        message: "Past payments fetched successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to fetch past payments: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(":id")
  async update(
    @Param("id") invoiceId: number,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<void> {
    try {
      const userId = req.loggedInUser;
      const invoice = await this.invoiceService.updateInvoice(
        invoiceId,
        updateInvoiceDto,
        userId
      );
      res.status(HttpStatus.OK).json({
        status: "success",
        data: invoice,
        message: "Invoice updated successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to update invoice: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  async remove(
    @Param("id") invoiceId: number,
    @Res() res: Response
  ): Promise<void> {
    try {
      await this.invoiceService.deleteInvoice(invoiceId);
      res.status(HttpStatus.NO_CONTENT).json({
        status: "success",
        message: "Invoice deleted successfully",
      });
    } catch (error) {
      throw new HttpException(
        `Failed to delete invoice: ${(error as Error).message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
