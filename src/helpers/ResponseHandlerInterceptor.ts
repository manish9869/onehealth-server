import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Response } from "express";

export interface ResponseFormat<T> {
  status: string;
  data: T;
  errors: any;
  message: string;
}

@Injectable()
export class ResponseHandlerInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ResponseFormat<T>> {
    const response: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode;
        const customMessage = response.locals.message || ""; // Capture custom message

        return {
          status: statusCode >= 200 && statusCode < 300 ? "success" : "error",
          data,
          errors: response.locals.errors || {},
          // Use the custom message or append to it
          message: `${customMessage} ${statusCode >= 200 && statusCode < 300 ? "Request processed successfully." : "Request failed."}`,
        };
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
