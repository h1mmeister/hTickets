export class DatabaseConnectionError extends Error {
  reason = 'Error connecting to the database!';
  constructor() {
    super();
    // this has to ben done because we are extending a built-in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
