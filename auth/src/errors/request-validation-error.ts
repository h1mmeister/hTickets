import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();
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
