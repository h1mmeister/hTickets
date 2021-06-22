import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

// api for signing in to the app
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must not be empty! You must enter a pasword!"),
  ],
  validateRequest,
  (req: Request, res: Response) => {}
);

export { router as signInRouter };
