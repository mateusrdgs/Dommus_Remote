const mongoose = require('mongoose'),
      UserSchema = require('./user'),
      ResidenceSchema = require('./residence');

mongoose.Promise = global.Promise;
const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String,
  pin: {
    type: Number,
    required: true
  },
  residences: [ResidenceSchema],
  users: [UserSchema]
});

mongoose.model('Account', AccountSchema);
module.exports = AccountSchema;