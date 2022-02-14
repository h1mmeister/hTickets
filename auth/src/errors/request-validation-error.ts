import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters!');
    // this has to ben done because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  // this method will format what we will send to the error handling middleware
  serializeErrors() {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
  }
}
