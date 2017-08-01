const mongoose = require('mongoose');

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

mongoose.model('User', UserSchema);
module.exports = UserSchema;