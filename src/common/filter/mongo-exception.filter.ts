import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

const MONGO_DUPLICATE_KEY_ERROR_CODES = [11000, 11001];

@Catch()
export class MongoExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // 2. Immediately handle and return standard NestJS HTTP exceptions
    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    let nestException: any;

    if (MONGO_DUPLICATE_KEY_ERROR_CODES.includes(exception.code)) {
      const keys = Object.keys(exception.keyPattern || {});
      const fieldName = keys.length > 0 ? keys[0] : 'field';
      const formattedField =
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

      nestException = new ConflictException(
        `${formattedField} is already taken.`,
      );
    } else if (exception.name === 'ValidationError') {
      // This catches Mongoose's specific validation errors
      nestException = new BadRequestException(exception.message);
    } else {
      // Tip: It's good practice to console.error(exception) here
      // so you can debug unexpected 500 errors in your terminal.
      console.error('Unhandled Exception:', exception);
      nestException = new InternalServerErrorException(
        'An unexpected database error occurred.',
      );
    }

    const status = nestException.getStatus();
    return response.status(status).json(nestException.getResponse());
  }
}
