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

// this is how we create a function with mongoose to work with schema
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// creating the model class with userSchema
const User = mongoose.model("User", userSchema);

// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };

export { User, buildUser };
