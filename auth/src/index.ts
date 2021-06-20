import express from "express";
import { json } from "body-parser";
import mongoose, { mongo } from "mongoose";
import cookieSession from "cookie-session";

import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true);

app.use(json());

// adding cookie-session
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// check for all the routes whih are not defined and throw not found error
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Using the error handling middleware
app.use(errorHandler);

// connecting to mongodb using clusterIP as it is present in another pod
const start = async () => {
  // checking if jwt_key is defined or not
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    // console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!");
  });
};

start();
