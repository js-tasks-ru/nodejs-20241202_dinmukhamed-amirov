import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import mongoose from "mongoose";

@Catch(mongoose.Error.ValidationError, mongoose.mongo.MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.error("MongoFilter caught exception:", exception); // ✅ Логирование ошибки

    let message = "Duplicate key error";

    if (exception instanceof mongoose.Error.ValidationError) {
      const errorMessages = Object.values(exception.errors).map(
        (err: any) => err.message,
      );
      message =
        errorMessages.length > 0
          ? errorMessages.join(", ")
          : "Validation error message";
    }

    if (
      exception instanceof mongoose.mongo.MongoError &&
      (exception as any).code === 11000
    ) {
      const keyValue = (exception as any).keyValue as Record<string, any>;
      message = `Duplicate key error: ${JSON.stringify(keyValue)}`;
    }

    response.status(400).json({
      statusCode: 400,
      error: "Bad Request",
      message,
    });
  }
}
