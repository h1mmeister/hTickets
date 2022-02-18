import mongoose from 'mongoose';

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

export { User };
