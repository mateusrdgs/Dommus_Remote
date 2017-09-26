const mongoose = require('mongoose'),
      passport = require('passport'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      Account = mongoose.model('Account'),
      AdminUser = require('../models/account').AdminUser;

function createAccount(req, res) {
  const { name, email, password, pin } = req.body,
  account = new Account({
    email
  });
  createStarterUser(account, name, pin);
  account.setPassword(password);
  account.save((error, account) => {
    if(error) {
      sendJsonResponse(res, 404, error);
      return;
    }
    else {
      const token = account.generateJwt();
      sendJsonResponse(res, 201, {
        'token': token
      });
      return;
    }
  });
}

function loginAccount(req, res) {
  passport.authenticate('local', function(error, user, info) {
    if(error) {
      sendJsonResponse(res, 500, error);
      return;
    }
    else if(user) {
      const token = user.generateJwt();
      sendJsonResponse(res, 200, {
        'token': token
      });
    }
    else {
      sendJsonResponse(res, 401, info);
    }
  })(req, res);
}

function returnAccount(req, res) {
  const { idAccount } = req.params;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {      
      sendJsonResponse(res, 404, { 
        'Message': 'Account not found!'
      });
      return;
    }
    else {
      sendJsonResponse(res, 200, { 
        'Account': account
      });
      return;
    }
  }, error => {
    sendJsonResponse(res, 500, { 
      'Error': error.message
    });
    return;
  });
}

function updateAccount(req, res) {
  const { idAccount } = req.params;
  const { email, password } = req.body;
  Account
  .findById(idAccount)
  .then((account) => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'Account not found!'
      });
    }
    else {
      account.email = email || account.email;
      account.setPassword(password);
      account.save((error, account) => {
        if(error) {
          sendJsonResponse(res, 500, { 
            'Error': error.errmsg 
          });
        } 
        else {
          sendJsonResponse(res, 200, { 
            'Account': account 
          });
        }
      });
    }
  }, error => {
    sendJsonResponse(res, 400, { 
      'Error': error.message
    });
  });
}

function deleteAccount(req, res) {
  const { idAccount } = req.params;
  Account
  .findByIdAndRemove(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'Account not found!'
      });
    }
    else {
      sendJsonResponse(res, 200, { 
        'Account': account
      });
    }        
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
  });  
}

module.exports = {
  createAccount,
  loginAccount,
  returnAccount,
  updateAccount,
  deleteAccount
}

function createStarterUser(account, name, pin) {
  const isAdmin = true,
        users = account.users,
        newUser = new AdminUser({
                    name,
                    isAdmin
                  });
  newUser.setPin(pin);
  users.push(newUser);
}