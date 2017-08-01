const mongoose = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      ObjectId = mongoose.Types.ObjectId;

function createRoom(req, res, next) {
  const { idAccount, idResidence } = req.params;
  const { description } = req.body;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!idResidence || !ObjectId.isValid(idResidence)) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else if(!description) {
    sendJsonResponse(res, 400, {
      'Message': 'Field description is required!'
    });
    return;
  }
  else {
    next();
  }
}

function returnRooms(req, res, next) {
  const { idAccount, idResidence } = req.params;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!idResidence || ObjectId.isValid(idResidence)) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else {
    next();
  }
}

function returnAndDeleteRoomById(req, res, next) {
  const { idAccount, idResidence, idRoom } = req.params;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!idResidence || !ObjectId.isValid(idResidence)) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else if(!idRoom || !ObjectId.isValid(idRoom)) {
    sendJsonResponse(res, 400, {
      'Message': 'Room Id is required!'
    });
    return;
  }
  else {
    next();
  }
}

function updateRoomById(req, res, next) {
  const { idAccount, idResidence, idRoom } = req.params;
  const { description } = req.body;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!idResidence || !ObjectId.isValid(idResidence)) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else if(!idRoom || !ObjectId.isValid(idRoom)) {
    sendJsonResponse(res, 400, {
      'Message': 'Room Id is required!'
    });
    return;
  }
  else if(!description) {
    sendJsonResponse(res, 400, {
      'Message': 'Field description is required!'
    });
    return;
  }
  else {
    next();
  }
}

module.exports = {
  createRoom,
  returnRooms,
  returnAndDeleteRoomById,
  updateRoomById
}