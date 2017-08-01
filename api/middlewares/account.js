const mongoose = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse, 
      ObjectId = mongoose.Types.ObjectId;

function createAccount(req, res, next) {
  const { email, pin } = req.body;
  if(!email || !pin)  {
    sendJsonResponse(res, 400, {
      'Message': 'Fields email and pin are required!'
    });
    return;
  }
  else {
    next();
  }
}

function returnAndDeleteAccount(req, res, next) {
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

function updateAccount(req, res, next) {
  const { idAccount } = req.params;
  const { email, pin } = req.body;
  if(!idAccount || !Object.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if (!email || !pin) {
    sendJsonResponse(res, 400, {
      'Message': 'Fields email and pin are required!'
    });
    return;
  }
  else {
    next();
  }
}

module.exports = { 
  createAccount,
  returnAndDeleteAccount,
  updateAccount
}