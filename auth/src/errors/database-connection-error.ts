export class DatabaseConnectionError extends Error {
  statusCode = 500;
  reason = 'Error connecting to the database!';
  constructor() {
    super();
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
