const mongoose  = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      Account = mongoose.model('Account'),
      ObjectId = mongoose.Types.ObjectId;

function createUser(req, res, next) {
  const { idAccount } = req.params;
  const { name, isAdmin, pin, password } = req.body;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!name || isAdmin === null || isAdmin === undefined || !pin) {
    sendJsonResponse(res, 400, {
      'Message': 'Fields name, isAdmin and pin are required!'
    });
    return;
  }
  else {
    if(isAdmin && !password) {
      sendJsonResponse(res, 400, {
        'Message': 'Field password is required!'
      });
    }
    else {
      Account
      .findById(idAccount)
      .then(account => {
        if(!account) {
          sendJsonResponse(res, 404, {
            'Message': 'Account not found!'
          });
        }
        else {
          const valid = account.validatePassword(password);
          if(valid) {
            next();
          }
          else {
            sendJsonResponse(res, 400, {
              'Message': 'Invalid password'
            });
          }
        }
      });
    }
  }
}

function returnUsers(req, res, next) {
  const { idAccount } = req.params;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else {
    next();
  }
}

function returnAndDeleteUserById(req, res, next) {
  const { idAccount, idUser } = req.params;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!idUser || !ObjectId.isValid(idUser)) {
    sendJsonResponse(res, 400, {
      'Message': 'User Id is required!'
    });
    return;
  }
  else {
    next();
  }
}

function updateUserById(req, res, next) {
  const { idAccount, idUser } = req.params;
  const { name, isAdmin } = req.body;
  if(!idAccount || !ObjectId(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!idUser || !ObjectId.isValid(idUser)) {
    sendJsonResponse(res, 400, {
      'Message': 'User Id is required!'
    });
    return;
  }
  else if(!name || !isAdmin) {
    sendJsonResponse(res, 400, {
      'Message': 'Fields name and isAdmin are required!'
    });
  }
  else {
    next();
  }
}

module.exports = {
  createUser,
  returnUsers,
  returnAndDeleteUserById,
  updateUserById
}