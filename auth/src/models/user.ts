import mongoose from "mongoose";
import { Password } from "../services/password";

// describes the properties of User
interface UserAttrs {
  email: string;
  password: string;
}

// describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// describes the properties of user document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// we are creating the schema for the model class
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // setting the properties sent back to the requester
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// this is how we create a function with mongoose to work with schema/ model
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// creating the model class with userSchema
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };

export { User };
