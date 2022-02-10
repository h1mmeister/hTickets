import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
  (req: Request, res: Response) => {
    // checking if we have any errors within the request object
    const errors = validationResult(req);

    // handling those errors by sending back the response
    if (!errors.isEmpty()) {
      // return res.status(400).send(errors.array());
      throw new Error('Invalid email or password!');
    }
    console.log('Creating a user...');
    res.send({});
  }
);

export { router as signUpRouter };
