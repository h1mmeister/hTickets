import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';

import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

// creating a router
const router = express.Router();

// we are using express-validator to validate the incoming email and password request
router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid!'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters!'),
  ],
  async (req: Request, res: Response) => {
    // checking if we have any errors within the request object
    const errors = validationResult(req);

    // handling those errors by sending back the response
    if (!errors.isEmpty()) {
      // return res.status(400).send(errors.array());
      // throw new Error('Invalid email or password!');
      throw new RequestValidationError(errors.array());
    }

    // we are taking out the email and password from the req body
    const { email, password } = req.body;

    // we are checking if the email elready exists in the database
    const existingUser = await User.findOne({ email });

    // if the email exists, we would simply return
    if (existingUser) {
      throw new BadRequestError('Email already in use!');
    }

    // otherwise, we will create and save the user in the database
    const user = User.build({ email, password });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
