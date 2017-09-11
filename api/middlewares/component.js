const mongoose = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      ObjectId = mongoose.Types.ObjectId;

function createComponent(req, res, next) {
  const { idAccount, idResidence, idRoom } = req.params;
  const { idBoard, description  } = req.body;
  let { type } = req.body;
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
  else if((!idBoard || !ObjectId.isValid(idBoard)) || !description || !type) {
    sendJsonResponse(res, 400, {
      'Message': 'Board Id, component description and type are required!'
    });
  }
  else {
    type = parseInt(type);
    switch(type) {
      case 1: { // LED
        const { digitalPin } = req.body;
        if(parseInt(digitalPin) < 0) {
          sendJsonResponse(res, 400, {
            'Message': 'Field digitalPin is required!'
          });
          return;
        }
        else {
          next();
        }
      }
      break;
      case 2: { // THERMOMETER
        const { analogPin, frequency } = req.body;
        if(parseInt(analogPin) < 0 || parseInt(frequency) < 1000) {
          sendJsonResponse(res, 400, {
            'Message': 'Fields , analogPin and frequency are required!'
          });
          return;
        }
        else {
          next();
        }
      }
      break;
      case 3: { // LIGHT
        const { analogPin, frequency, threshold } = req.body;
        if(parseInt(analogPin) < 0 || parseInt(frequency) < 1000 || parseInt(threshold) < 0) {
          sendJsonResponse(res, 400, {
            'Message': 'Fields , analogPin, frequency and threshold are required!'
          });
          return;
        }
        else {
          next();
        }
      }
      break;
      case 4: { // MOTION
        const { digitalPin } = req.body;
        if(parseInt(digitalPin) < 0) {
          sendJsonResponse(res, 400, {
            'Message': 'Fields digitalPin and  are required!'
          });
          return;
        }
        else {
          next();
        }
      }
      break;
      case 5: { // SENSOR
        const { analogPin, threshold, frequency } = req.body;
        if(parseInt(analogPin) < 0 || parseInt(threshold) < 0 || parseInt(frequency) < 1000) {
          sendJsonResponse(res, 400, {
            'Message': 'Fields analogPin, , threshold and frequency are required!'
          });
          return;
        }
        else {
          next();
        }
      }
      break;
      case 6: { // SERVO
        const { digitalPin, rotation, startAt, range } = req.body,
              [minRange, maxRange] = range;
        if(parseInt(digitalPin) < 0 || parseInt(rotation) < 0 || (parseInt(startAt) < 0) || (parseInt(minRange) < 0) || parseInt(maxRange) < 0) {
          sendJsonResponse(res, 400, {
            'Message': 'Fields digitalPin, rotation, startAt, minRange and maxRange are required!'
          });
          return;
        }
        else {
          next();
        }
      }
      break;
      default: {
        sendJsonResponse(res, 400, {
          'Message': 'Invalid component type'
        });
        return;
      }
    }
  }
}

function returnComponents(req, res, next) {
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

function returnAndDeleteComponentById(req, res, next) {
  const { idAccount, idResidence, idRoom, idComponent } = req.params;
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
  else if(!idComponent || !ObjectId.isValid(idComponent)) {
    sendJsonResponse(res, 400, {
      'Message': 'Component Id is required!'
    });
  }
  else {
    next();
  }
}

function updateComponentById(req, res, next) {
  const { idAccount, idResidence, idRoom, idComponent } = req.params;
  const { idBoard, description  } = req.body;
  let { type } = req.body;
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
  else if(!idComponent || !Object.isValid(idComponent)) {
    sendJsonResponse(res, 400, {
      'Messsage': 'Component Id is required!'
    });
    return;
  }
  else if((!idBoard || !ObjectId.isValid(idBoard)) || !description || !type) {
    sendJsonResponse(res, 400, {
      'Message': 'Board Id, component description and type are required!'
    });
    return;
  }
  else {
    type = parseInt(type);
    switch(type) {
    case 1: { // LED
      const { digitalPin } = req.body;
      if(parseInt(digitalPin) < 0) {
        sendJsonResponse(res, 400, {
          'Message': 'Field digitalPin is required!'
        });
        return;
      }
      else {
        next();
      }
    }
    break;
    case 2: { // THERMOMETER
      const { analogPin, frequency } = req.body;
      if(parseInt(analogPin) < 0 || parseInt(frequency) < 1000) {
        sendJsonResponse(res, 400, {
          'Message': 'Fields , analogPin and frequency are required!'
        });
        return;
      }
      else {
        next();
      }
    }
    break;
    case 3: { // LIGHT
      const { analogPin, frequency, threshold } = req.body;
      if(parseInt(analogPin) < 0 || parseInt(frequency) < 1000 || parseInt(threshold) < 0) {
        sendJsonResponse(res, 400, {
          'Message': 'Fields , analogPin, frequency and threshold are required!'
        });
        return;
      }
      else {
        next();
      }
    }
    break;
    case 4: { // MOTION
      const { digitalPin } = req.body;
      if(parseInt(digitalPin) < 0) {
        sendJsonResponse(res, 400, {
          'Message': 'Fields digitalPin and  are required!'
        });
        return;
      }
      else {
        next();
      }
    }
    break;
    case 5: { // SENSOR
      const { analogPin, threshold, frequency } = req.body;
      if(parseInt(analogPin) < 0 || parseInt(threshold) < 0 || parseInt(frequency) < 1000) {
        sendJsonResponse(res, 400, {
          'Message': 'Fields analogPin, threshold and frequency are required!'
        });
        return;
      }
      else {
        next();
      }
    }
    break;
    case 6: { // SERVO
      const { digitalPin, rotation, startAt, range } = req.body,
            [minRange, maxRange] = range;
      if(parseInt(digitalPin) < 0 || parseInt(rotation) < 0 || !parseInt(startAt) || !parseInt(minRange) || !parseInt(maxRange)) {
        sendJsonResponse(res, 400, {
          'Message': 'Fields digitalPin, rotation, startAt,  minRange and maxRange are required!'
        });
        return;
      }
      else {
        next();
      }
    }
    break;
    default: {
      sendJsonResponse(res, 400, {
        'Message': 'Invalid component type'
      });
      return;
    }
  }
  }
}

module.exports = {
  createComponent,
  returnComponents,
  returnAndDeleteComponentById,
  updateComponentById
}