const mongoose = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      ObjectId = mongoose.Types.ObjectId;

function createResidence(req, res, next) {
  const { idAccount } = req.params;
  const { description, url } = req.body;
  if(!idAccount || !ObjectId.isValid(idAccount)) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!description || !url) {
    sendJsonResponse(res, 400, {
      'Message': 'Fields description and url are required!'
    });
    return;
  }
  else {
    next();
  }
}

function returnResidences(req, res, next) {
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

function returnAndDeleteResidenceById(req, res, next) {
  const { idAccount, idResidence } = req.params;
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
  else {
    next();
  }
}

function updateResidenceById(req, res, next) {
  const { idAccount, idResidence } = req.params;
  const { description, url } = req.body;
  if(!idAccount ||! !ObjectId.isValid(idAccount)) {
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
  else if(!description || !url) {
    sendJsonResponse(res, 400, {
      'Message': 'Fields description and url are required!'
    });
    return;
  }
  else {
    next();
  }
}

module.exports = {
  createResidence,
  returnResidences,
  returnAndDeleteResidenceById,
  updateResidenceById
}