import { Request, Response, NextFunction } from "express";

import { CustomError } from "../errors/custom-error";

// error handler
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    // console.log("Handling this error as a request validation error");

    // formatting the errors in a common format
    // const formattedErrors = err.errors.map((error) => {
    //   return { message: error.msg, field: error.param };
    // });
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // if (err instanceof DatabaseConnectionError) {
  //   // console.log("Handling this error as a Database connection error");
  //   return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  // }

  // will inspect err to customize the message later
  res.status(400).send({
    errors: [{ message: "Something went worng!" }],
  });
};
