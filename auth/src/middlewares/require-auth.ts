import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if the user is not logged in, throw not authorized error
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
