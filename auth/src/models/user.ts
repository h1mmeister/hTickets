import mongoose from "mongoose";

// describes the properties of User
interface UserAttrs {
  email: string;
  password: string;
}

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

const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User, buildUser };
