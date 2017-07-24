import mongoose from 'mongoose';
import { sendJsonResponse } from '../helper/helper';

const ObjectId = mongoose.Types.ObjectId;

function createBoard(req, res, next) {
  const { idAccount, idResidence } = req.params;
  const { description, model, port } = req.body;
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
  else if(!description || !model || !port) {
    sendJsonResponse(res, 400, {
      'Message': 'Fields description, model and port are required!'
    });
    return;
  }
  else {
    next();
  }
}

function returnBoards(req, res, next) {
  const { idAccount, idResidence } = req.params;
  if(!idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!idResidence) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else {
    next();
  }
}

function returnAndDeleteBoardById(req, res, next) {
  const { idAccount, idResidence, idBoard } = req.params;
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
  else if(!idBoard || !ObjectId.isValid(idBoard)) {
    sendJsonResponse(res, 400, {
      'Message': 'Board Id is required!'
    });
    return;
  }
  else {
    next();
  }
}

function updateBoardById(req, res, next) {
  const { idAccount, idResidence, idBoard } = req.params;
  const { description, model, port, analogPins, digitalPins } = req.body;
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
  else if(!idBoard || !ObjectId.isValid(idBoard)) {
    sendJsonResponse(res, 400, {
      'Message': 'Board Id is required!'
    });
    return;
  }
  else if(!description || !model || !port || !analogPins.length || !digitalPins.length) {
    sendJsonResponse(res, 400, {
      'Message': 'Fields description, model, port, analogPins and digitalPins are required!'
    });
    return;
  }
  else {
    next();
  }
}

export {
  createBoard,
  returnBoards,
  returnAndDeleteBoardById,
  updateBoardById
}