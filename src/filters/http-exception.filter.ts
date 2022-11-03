import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

@Catch(AxiosError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.OK;
    const error = exception['message'];
    response.status(status).json({
      Response: 'False',
      statusCode: status,
      timestamp: new Date().toISOString(),
      Error: error,
    });
  }
}
