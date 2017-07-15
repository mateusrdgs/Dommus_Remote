import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
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

export default UserSchema;