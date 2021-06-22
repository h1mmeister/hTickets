import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // checking the errors within the request - object
  const errors = validationResult(req);
  // if there exist some errors, we send the array of errors back to the requester
  if (!errors.isEmpty()) {
    // throwing a request validation error
    throw new RequestValidationError(errors.array());
  }
  next();
};
