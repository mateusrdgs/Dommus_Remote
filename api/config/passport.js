const passport = require('passport'),
      localStrategy = require('passport-local').Strategy,
      mongoose = require('mongoose'),
      User = mongoose.model('User');

passport.use(new localStrategy({
  usernameField: 'email'
}, function(username, password, done) {
  User.findOne({ email: username }, (error, user) => {
    if(error) {
      return done(error);
    }
    else if(!user) {
      return done(null, false, {
        'message': 'Invalid username'
      });
    }
    else if(!User.validPassword(password)) {
      return done(null, false, {
        'message': 'Invalid password'
      });
    }
    else {
      return done(null, user);
    }
  });
}));