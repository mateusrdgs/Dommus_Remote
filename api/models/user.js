const mongoose = require('mongoose'),
      crypto =  require('crypto'),
      jwt = require('jsonwebtoken'),
      options = { discriminatorKey: 'type', _id: false };

mongoose.Promise = global.Promise;
const UserSchema = new mongoose.Schema({  
  type: {
    type: String,
    required: true,
    enum: ['common', 'admin']
  },
  avatar: {
    type: Buffer
  }
}, options);

const User = mongoose.model('User', UserSchema);

const CommonUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, options);

const CommonUser = User.discriminator('common', CommonUserSchema);

const AdminUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hashPin: String,
  saltPin: String
}, options);

AdminUserSchema.methods.setPin = function(pin) {
  this.saltPin = crypto.randomBytes(16).toString('hex');
  this.hashPin = crypto.pbkdf2Sync(pin, this.saltPin, 1000, 64, 'sha512').toString('hex');
}

AdminUserSchema.methods.validatePin = function(pin) {
  const hashPin = crypto.pbkdf2Sync(pin, this.saltPin, 1000, 64, 'sha512').toString('hex');
  return this.hashPin === hashPin;
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

const AdminUser = User.discriminator('admin', AdminUserSchema);

module.exports = {
  CommonUser,
  AdminUser
};