const mongoose = require('mongoose'),
      crypto = require('crypto'),
      jwt = require('jsonwebtoken'),
      UserSchema = require('./user').UserSchema,
      CommonUserSchema = require('./user').CommonUserSchema,
      AdminUserSchema = require('./user').AdminUserSchema,
      ResidenceSchema = require('./residence');

mongoose.Promise = global.Promise;
const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  passwordSalt: String,
  passwordHash: String,
  pinSalt: String,
  pinHash: String,
  residences: [ResidenceSchema],
  users: [UserSchema]
});

AccountSchema.methods.setPassword = function(password) {
  this.passwordSalt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 64, 'sha512').toString('hex');
}

AccountSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 64, 'sha512').toString('hex');
  return this.passwordHash === hash;
}

AccountSchema.methods.setPin = function(pin) {
  this.pinSalt = crypto.randomBytes(16).toString('hex');
  this.pinHash = crypto.pbkdf2Sync(pin, this.pinSalt, 1000, 64, 'sha512').toString('hex');
}

AccountSchema.methods.validatePin = function(pin) {
  const hash = crypto.pbkdf2Sync(pin, this.pinSalt, 1000, 64, 'sha512').toString('hex');
  return this.pinHash === hash;
}

AccountSchema.methods.generateJwt = function() {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    expiration: parseInt(expiration.getTime() / 1000)
  }, process.env.SECRET_JWT);
}

mongoose.model('Account', AccountSchema);

const AdminUser = AccountSchema.path('users').discriminator(true, AdminUserSchema);
const CommonUser = AccountSchema.path('users').discriminator(false, CommonUserSchema);

module.exports = {
  AccountSchema,
  AdminUser,
  CommonUser
};