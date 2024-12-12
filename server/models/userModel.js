import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Firstname is required'],
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  isEmailVerified: { 
    type: Boolean, 
    default: false 
  },
  otp: { 
    type: String,    // Store the OTP temporarily
  }, 
  otpExpiresAt: { 
    type: Date,    // Expiration time for the OTP
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',  
  }],
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
