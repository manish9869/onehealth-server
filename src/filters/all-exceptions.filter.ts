import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

interface ErrorResponse {
  status: string;
  data: null;
  errors: any;
  message: string;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status: number =
      exception instanceof HttpException ? exception.getStatus() : 500;

    // Customize your error response structure
    const errorResponse: ErrorResponse = {
      status: 'error',
      data: null,
      errors:
        exception instanceof HttpException
          ? exception.getResponse()
          : 'An unexpected error occurred',
      message: 'An unexpected error occurred',
    };

    // Set the response status and send the error response
    response.status(status).json(errorResponse);
  }
}
