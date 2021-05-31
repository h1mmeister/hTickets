import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

// api for signing up the app
router.post(
  "/api/users/signup",
  [
    // we are using express-validator for validation - works as a middleware
    body("email").isEmail().withMessage("Invalid email! Email must be valid."),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters long!"),
  ],
  (req: Request, res: Response) => {
    // checking the errors within the request - object
    const errors = validationResult(req);
    // if there exist some errors, we send the array of errors back to the requester
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
    }

    const { email, password } = req.body;
    res.send({});
  }
);

export { router as signUpRouter };
