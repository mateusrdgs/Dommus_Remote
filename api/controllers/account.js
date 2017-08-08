const mongoose = require('mongoose'),
      passport = require('passport'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      Account = mongoose.model('Account');

function createAccount(req, res) {
  const { email, password, pin } = req.body,
          account = new Account();
  account.email = email;
  account.setPassword(password);
  account.pin = pin;
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
  const { email, password } = req.body;
  passport.authenticate('local', (error, user, info) => {
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
  })
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
  const { email, pin } = req.body;
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
      account.pin = pin || account.pin;
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