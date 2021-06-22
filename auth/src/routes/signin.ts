import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

// api for signing in to the app
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid!"),
    body("password")
      .trim()
      .isEmpty()
      .withMessage("Password must not be empty! You must enter a pasword!"),
  ],
  (req: Request, res: Response) => {
    // checking the errors within the request - object
    const errors = validationResult(req);
    // if there exist some errors, we send the array of errors back to the requester
    if (!errors.isEmpty()) {
      // throwing a request validation error
      throw new RequestValidationError(errors.array());
    }

    res.send("Hi there!");
  }
);

export { router as signInRouter };
