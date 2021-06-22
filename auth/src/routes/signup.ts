import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    // if the user exist, return with the error otherwise create the user in the database
    if (existingUser) {
      // need to check the error
      // console.log("Email in use");
      // res.send({});
      throw new BadRequestError("Email already in use");
    }
    const user = User.build({ email, password });
    await user.save();

    // generate json web token
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // store the jwt on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
