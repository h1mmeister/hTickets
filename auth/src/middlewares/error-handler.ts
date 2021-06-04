import { Request, Response, NextFunction } from "express";

import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

// error handler
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    // console.log("Handling this error as a request validation error");

    // for matting the errors in a common format
    const formattedError = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }

  if (err instanceof DatabaseConnectionError) {
    console.log("Handling this error as a Database connection error");
  }

  // will inspect err to customize the message later
  res.status(400).send({
    message: err.message,
  });
};
