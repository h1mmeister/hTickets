import { Request, Response, NextFunction } from "express";

// error handler
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Something went wrong!", err);

  // will inspect err to customize the message later
  res.status(400).send({
    message: "Something went wrong!",
  });
};
