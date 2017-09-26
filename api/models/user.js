const mongoose = require('mongoose'),
      crypto =  require('crypto'),
      jwt = require('jsonwebtoken'),
      rootOptions = { discriminatorKey: 'isAdmin' },
      childOptions = { discriminatorKey: 'isAdmin', _id: false };

mongoose.Promise = global.Promise;
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    enum: [true, false]
  },
  avatar: {
    type: Buffer
  }
}, rootOptions);

const CommonUserSchema = new mongoose.Schema({
  
}, childOptions);

const AdminUserSchema = new mongoose.Schema({
  hashPin: String,
  saltPin: String
}, childOptions);

AdminUserSchema.methods.setPin = function(pin) {
  this.saltPin = crypto.randomBytes(16).toString('hex');
  this.hashPin = crypto.pbkdf2Sync(pin, this.saltPin, 1000, 64, 'sha512').toString('hex');
}

AdminUserSchema.methods.validatePin = function(pin) {
  const hashPin = crypto.pbkdf2Sync(pin, this.saltPin, 1000, 64, 'sha512').toString('hex');
  return this.hashPin === hashPin;
}

AdminUserSchema.methods.updatePin = function(newPin) {
  this.hashPin = crypto.pbkdf2Sync(newPin, this.saltPin, 1000, 64, 'sha512').toString('hex');
}

AdminUserSchema.methods.generateJwt = function() {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    name: this.name,
    expiration: parseInt(expiration.getTime() / 1000)
  }, process.env.SECRET_JWT);
}

module.exports = {
  UserSchema,
  AdminUserSchema,
  CommonUserSchema
};