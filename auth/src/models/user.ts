import mongoose from 'mongoose';

// an interface that describes the properties required to create a new user
interface UserAttrs {
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

// creating the model to add documents with respect to the schema
const User = mongoose.model('User', userSchema);

// we will not directly call new User with email and password as we will not be able to check the types
// as well as any typos. Instead, we will use this function to create the user that actually takes attrs of interface type
const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User, buildUser };
