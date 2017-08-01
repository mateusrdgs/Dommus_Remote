const mongoose = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      Account = mongoose.model('Account');

function createAccount(req, res) {
  const { email, pin } = req.body;
  Account.create({
    email,
    pin
  }, (error, account) => {
    if(error) {
      sendJsonResponse(res, 500, { 
        'Error': error.errmsg 
      });
      return;
    }
    else {
      sendJsonResponse(res, 201, { 
        'Account': account 
      });
      return;
    }
  });
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
  returnAccount,
  updateAccount,
  deleteAccount
}