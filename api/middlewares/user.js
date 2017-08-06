const mongoose  = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      ObjectId = mongoose.Types.ObjectId;

function createUser(req, res, next) {
  const { idAccount } = req.params;
  const { name, type } = req.body;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!name || !type) {
    sendJsonResponse(res, 400, {
      'Message': 'Fields name and type are required!'
    });
    return;
  }
  else {
    next();
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
  const { name, type } = req.body;
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
  else if(!name || !type) {
    sendJsonResponse(res, 400, {
      'Message': 'Fields name and type are required!'
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