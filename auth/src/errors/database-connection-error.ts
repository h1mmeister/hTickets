import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to the database!';
  constructor() {
    super('Error connecting to db!');
    // this has to ben done because we are extending a built-in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  // this method will format what we will send to the error handling middleware
  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
