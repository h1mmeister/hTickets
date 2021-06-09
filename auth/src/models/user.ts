import mongoose from "mongoose";

// we are creating the schema for the model class
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// creating the model class with userSchema
const User = mongoose.model("User", userSchema);

export { User };
