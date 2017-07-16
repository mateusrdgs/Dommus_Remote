import mongoose from 'mongoose';
import { sendJsonResponse } from '../helper/helper';

const Account = mongoose.model('Account');

function createAccount(req, res) {
  if(!req.body.email || !req.body.pin) {
    sendJsonResponse(res, 400, { 
      'Error':'Email and Pin required' 
    });
    return;
  }
  else {
    const email = req.body.email;
    const pin = req.body.pin;
    Account.create({
      email,
      pin
    }, (error, account) => {
      if(error) {
        sendJsonResponse(res, 400, { 
          'Error': error 
        });
        return;
      }
      else {
        sendJsonResponse(res, 200, { 
          'Account': account 
        });
        return;
      }
    });
  }
}

function returnAccount(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, { 
      'Message': 'Field Id required' 
    });
    return;
  }
  else {
    const idAccount = req.params.idAccount;
    Account
    .findById(idAccount)
    .then(account => {
      if(account) {          
        sendJsonResponse(res, 200, { 
          'Account': account
        });
        return;
      }
      else if(!account) {          
        sendJsonResponse(res, 404, { 
          'Message': 'Account not found!' 
        });
        return;
      }
    }, error => {
      console.log(error.message);
      sendJsonResponse(res, 400, { 
        'Error': error.message 
      });
      return;
    });
  }
}

function updateAccount(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Field Id required!'
    });
    return;
  }
  else {
    const idAccount = req.params.idAccount;
    Account
    .findById(idAccount)
    .then((account) => {
      if(account) {
        account.email = req.body.email || account.email;
        account.pin = req.body.pin || account.pin;
        account.save((error, account) => {
          if(error) {
            sendJsonResponse(res, 400, { 
              'Error': error.message 
            });
          } 
          else {
            sendJsonResponse(res, 200, { 
              'Account': account 
            });
          }
        });
      }
      else {
        sendJsonResponse(res, 404, { 
          'Message': 'Account not found!'
        });
        return;
      }
    }, error => {
      sendJsonResponse(res, 400, { 
        'error': error.message 
      });
    });
  }
}

function deleteAccount(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Field Id required!'
    });
  }
  else {
    const idAccount = req.params.idAccount;
    Account
    .findByIdAndRemove(idAccount)
    .then(account => {
      if(!account) {
        sendJsonResponse(res, 404, {
          'Error': 'Account not found!'
        });
      }
      else {
        sendJsonResponse(res, 200, { 
          'Account': account
        });
      }        
    }, error => {
      sendJsonResponse(res, 400, {
        'Error': error
      });
    });
  }
}

export {
  createAccount,
  returnAccount,
  updateAccount,
  deleteAccount
}