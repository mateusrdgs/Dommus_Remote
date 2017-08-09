const passport = require('passport'),
      localStrategy = require('passport-local').Strategy,
      mongoose = require('mongoose'),
      Account = mongoose.model('Account');

passport.use(new localStrategy({
  usernameField: 'email'
}, function(username, password, done) {
  Account.findOne({ email: username }, function(error, account) {
    if(error) {
      return done(error);
    }
    else if(!account) {
      return done(null, false, {
        'message': 'Invalid username'
      });
    }
    else if(!account.validatePassword(password)) {
      return done(null, false, {
        'message': 'Invalid password'
      });
    }
    else {
      return done(null, account);
    }
  });
}));