import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import * as fs from "fs";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException ? exception.getStatus() : 500;
    const message = isHttpException
      ? exception.message
      : "Mock error for testing";
    const timestamp = new Date().toISOString();
    const path = host.switchToHttp().getRequest().path;
    const error = null;

    const response = host.switchToHttp().getResponse();
    response.status(status).json({
      statusCode: status,
      message,
      timestamp,
      path,
      error,
    });

    fs.appendFileSync(
      "errors.log",
      `[${timestamp}] ${status} - ${message}\n`,
    );
  }
}
