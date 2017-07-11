import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: Boolean,
    required: true
  },
  avatar: {
    type: Buffer
  }
});

module.exports = UserSchema;