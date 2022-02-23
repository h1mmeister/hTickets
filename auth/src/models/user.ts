import mongoose from 'mongoose';
import { Password } from '../services/password';

// an interface that describes the properties required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// an interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// an interface that describes the properties that a user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// here we are creating the schema for the model
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

// this method will help us in storing the password in hashed form when saving the user in the db.
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

// this will help us in getting a method on userSchema and we do not have to export User and buildUser separately
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// creating the model to add documents with respect to the schema
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// we will not directly call new User with email and password as we will not be able to check the types
// as well as any typos. Instead, we will use this function to create the user that actually takes attrs of interface type
// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };

export { User };
