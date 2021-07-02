import mongoose, { mongo } from "mongoose";
import { app } from "./app";

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
