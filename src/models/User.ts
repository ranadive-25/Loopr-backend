import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profilePicture: String,
  settings: {
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    currency: String,
    language: String
  }
});

export const User = mongoose.model('User', userSchema);
