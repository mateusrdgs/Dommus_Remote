import { sendJsonResponse } from '../helper/helper';

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

function returnDeleteAccount(req, res, next) {
  const { idAccount } = req.params;
  if(!idAccount) {
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
  if(!idAccount) {
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

export { 
  createAccount,
  returnDeleteAccount,
  updateAccount
}