const mongoose = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      Account = mongoose.model('Account'),
      SwitchComponent = require('../models/room').SwitchComponent,
      ThermometherComponent = require('../models/room').ThermometherComponent,
      MotionComponent = require('../models/room').MotionComponent,
      SensorComponent = require('../models/room').SensorComponent,
      ServoComponent = require('../models/room').ServoComponent;

function createComponent(req, res) {
  const { idAccount, idResidence, idRoom } = req.params;
  const { idBoard, description } = req.body;
  let { type } = req.body;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'No account found!'
      });
      return;
    }
    else {
      const residences = account.residences;
      if(!residences.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No residences on this account!'
        });
        return;
      }
      else {
        const residence = residences.id(idResidence);
        if(!residence) {
          sendJsonResponse(res, 404, {
            'Message': 'No residence found!'
          });
          return;
        }
        else {
          const rooms = residence.rooms;
          if(!rooms.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No rooms on this residence'
            });
            return;
          }
          else {
            const room = rooms.id(idRoom);
            if(!room) {
              sendJsonResponse(res, 404, {
                'Message': 'No room found!'
              });
              return;
            }
            else {
              const components = room.components;
              type = parseInt(type);
              switch(type) {
                case 1: {
                  let { digitalPin } = req.body;
                  digitalPin = parseInt(digitalPin);
                  components.push(new SwitchComponent({
                    idBoard,
                    description,
                    type,
                    digitalPin
                  }));
                  updateBoardFreePins(residence, idBoard, type, digitalPin);
                }
                break;
                case 2: {
                  let { analogPin, frequency, controller } = req.body;
                  analogPin = parseInt(analogPin);
                  frequency = parseInt(frequency);
                  components.push(new ThermometherComponent({
                    idBoard,
                    description,
                    controller,
                    type,
                    analogPin,
                    frequency
                  }));
                  updateBoardFreePins(residence, idBoard, type, analogPin);
                }
                break;
                case 3: {
                  let { analogPin } = req.body;
                  analogPin = parseInt(analogPin);
                  components.push(new MotionComponent({
                    idBoard,
                    description,
                    type,
                    analogPin,
                  }));
                  updateBoardFreePins(residence, idBoard, type, analogPin);
                }
                case 4: {
                  const { controller } = req.body;
                  let { analogPin, threshold } = req.body;
                  analogPin = parseInt(analogPin);
                  components.push(new SensorComponent({
                    idBoard,
                    description,
                    type,
                    analogPin,
                    controller,
                    threshold
                  }));
                  updateBoardFreePins(residence, idBoard, type, analogPin);
                }
                case 5: {
                  let { digitalPin, rotation, minRange, maxRange } = req.body;
                  digitalPin = parseInt(digitalPin);
                  rotation = parseInt(rotation);
                  minRange = parseInt(minRange);
                  maxRange = parseInt(maxRange);
                  components.push(new ServoComponent({
                    idBoard,
                    description,
                    type,
                    digitalPin,
                    rotation,
                    range: [minRange, maxRange]
                  }));
                  updateBoardFreePins(residence, idBoard, type, digitalPin);
                }
                break;
                default: {
                  sendJsonResponse(res, 400, {
                    'Message': 'Invalid component type'
                  });
                  return;
                }
              }
              account.save((error, account) => {
                if(error) {
                  sendJsonResponse(res, 500, {
                    'Error': error.errmsg
                  });
                  return;
                }
                else {
                  const componentsLength = components.length;
                  sendJsonResponse(res, 201, {
                    'Component': components[componentsLength - 1]
                  });
                  return;
                }
              });
              
            }
          }
        }
      }
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
    return;
  });
}

function returnComponents(req, res) {
  const { idAccount, idResidence, idRoom } = req.params;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'No account found!'
      });
      return;
    }
    else {
      const residences = account.residences;
      if(!residences.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No residences on this account!'
        });
        return;
      }
      else {
        const residence = residences.id(idResidence);
        if(!residence) {
          sendJsonResponse(res, 404, {
            'Message': 'No residence found!'
          });
          return;
        }
        else {
          const rooms = residence.rooms;
          if(!rooms.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No rooms on this residence!'
            });
            return;
          }
          else {
            const room = rooms.id(idRoom);
            if(!room) {
              sendJsonResponse(res, 404, {
                'Message': 'No room found!'
              });
            }
            else {
              const components = room.components;
              if(!components.length) {
                sendJsonResponse(res, 404, {
                  'Message': 'No components on this room!'
                });
                return;
              }
              else {
                sendJsonResponse(res, 200, {
                  'Components': components
                });
                return;
              }
            }
          }
        }
      }
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
    return;
  });
}

function returnComponentById(req, res) {
  const { idAccount, idResidence, idRoom, idComponent } = req.params;
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
      const residences = account.residences;
      if(!residences.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No residences on this account!'
        });
        return;
      }
      else {
        const residence = residences.id(idResidence);
        if(!residence) {
          sendJsonResponse(res, 404, {
            'Message': 'No residence found!'
          });
          return;
        }
        else {
          const rooms = residence.rooms;
          if(!rooms.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No rooms on this residence!'
            });
            return;
          }
          else {
            const room = rooms.id(idRoom);
            if(!room) {
              sendJsonResponse(res, 404, {
                'Message': 'No room found!'
              });
              return;
            }
            else {
              const components = room.components;
              if(!components.length) {
                sendJsonResponse(res, 404, {
                  'Message': 'No components on this room!'
                });
                return;
              }
              else {
                const component = components.id(idComponent);
                if(!component) {
                  sendJsonResponse(res, 404, {
                    'Message': 'No component found!'
                  });
                  return;
                }
                else {
                  sendJsonResponse(res, 200, {
                    'Component': component
                  });
                  return;
                }
              }
            }
          }
        }
      }
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
  });
}

function updateComponentById(req, res) {
  const { idAccount, idResidence, idRoom, idComponent } = req.params;
  const { idBoard, description } = req.body;
  let { type } = req.body;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'No account found!'
      });
      return;
    }
    else {
      const residences = account.residences;
      if(!residences.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No residences on this account!'
        });
        return;
      }
      else {
        const residence = residences.id(idResidence);
        if(!residence) {
          sendJsonResponse(res, 404, {
            'Message': 'No residence found!'
          });
          return;
        }
        else {
          const rooms = residence.rooms;
          if(!rooms.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No rooms on this residence!'
            });
            return;
          }
          else {
            const room = rooms.id(idRoom);
            if(!room) {
              sendJsonResponse(res, 404, {
                'Message': 'No room found!'
              });
              return;
            }
            else {
              const components = room.components;
              if(!components.length) {
                sendJsonResponse(res, 404, {
                  'Message': 'No components on this room!'
                });
                return;
              }
              else {
                const component = components.id(idComponent);
                if(!component) {
                  sendJsonResponse(res, 404, {
                    'Message': 'No component found!'
                  });
                  return;
                }
                else {
                  type = parseInt(type);
                  component.idBoard = idBoard || component.idBoard;
                  component.description = description || component.description;
                  component.type = type || component.type;
                  switch(type) {
                    case 1: {
                      const { digitalPin } = req.body;
                      component.digitalPin = parseInt(digitalPin) || component.digitalPin;
                      updateBoardFreePins(residence, idBoard, type, digitalPin);
                    }
                    break;
                    case 2: {
                      const { analogPin, frequency, controller } = req.body;
                      component.controller = controller || component.controller;
                      component.analogPin = parseInt(analogPin) || component.analogPin;
                      component.frequency = parseInt(frequency) || component.frequency;
                      updateBoardFreePins(residence, idBoard, type, analogPin)
                    }
                    break;
                    case 3: {
                      const { analogPin, controller } = req.body;
                      component.analogPin = parseInt(analogPin) || component.analogPin;
                      component.controller = controller || component.controller;
                      updateBoardFreePins(residence, idBoard, type, analogPin);
                    }
                    case 4: {
                      const { analogPin, controller, threshold, frequency } = req.body;
                      component.digitalPin = parseInt(analogPin) || component.digitalPin;
                      component.controller = controller || component.controller;
                      component.threshold = parseInt(threshold) || component.threshold;
                      component.frequency = parseInt(frequency) || component.frequency;
                      updateBoardFreePins(residence, idBoard, type, analogPin)
                    }
                    case 5: {
                      const { digitalPin, rotation, startAt, minRange, maxRange } = req.body;
                      component.digitalPin = parseInt(digitalPin) || component.digitalPin;
                      component.rotation = parseInt(rotation) || component.rotation;
                      component.startAt =  parseInt(startAt) || component.range;
                      component.range = [parseInt(minRange), parseInt(maxRange)] || component.range;
                      updateBoardFreePins(residence, idBoard, type, digitalPin)
                    }
                    break;
                    default: {
                      sendJsonResponse(res, 400, {
                        'Message': 'Component type not allowed!'
                      });
                      return;
                    }
                  }
                  account.save((error, account) => {
                    if(error) {
                      sendJsonResponse(res, 500, {
                        'Error': error.errmsg
                      });
                      return;
                    }
                    else {
                      sendJsonResponse(res, 200, {
                        'Component': component
                      });
                      return;
                    }
                  });
                }
              }
            }
          }
        }
      }
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
    return;
  });
}

function deleteComponentById(req, res) {
  const { idAccount, idResidence, idRoom, idComponent } = req.params;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'No account found!'
      });
      return;
    }
    else {
      const residences = account.residences;
      if(!residences.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No residence on this account!'
        });
        return;
      }
      else {
        const residence = residences.id(idResidence);
        if(!residence) {
          sendJsonResponse(res, 404, {
            'Message': 'No residence found!'
          });
          return;
        }
        else {
          const rooms = residence.rooms;
          if(!rooms.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No rooms on this residence!'
            });
            return;
          }
          else {
            const room = rooms.id(idRoom);
            if(!room) {
              sendJsonResponse(res, 404, {
                'Message': 'No room found!'
              });
              return;
            }
            else {
              const components = room.components;
              if(!components.length) {
                sendJsonResponse(res, 404, {
                  'Message': 'No components on this room!'
                });
                return;
              }
              else {
                const component = components.id(idComponent);
                if(!component) {
                  sendJsonResponse(res, 404, {
                    'Message': 'No component found!'
                  });
                  return;
                }
                else {
                  component.remove();
                  account.save((error, account) => {
                    if(error) {
                      sendJsonResponse(res, 500, {
                        'Error': error.message
                      });
                      return;
                    }
                    else {
                      sendJsonResponse(res, 200, {
                        'Message': 'Component removed!'
                      });
                      return;
                    }
                  });
                }
              }
            }
          }
        }
      }
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
    return;
  });
}

function updateBoardFreePins(residence, idBoard, componentType, pinValue) {
  const boards = residence.boards;
  if(!boards) {
    return;
  }
  else {
    const board = boards.id(idBoard);
    if(!board) {
      return;
    }
    else {
      if(componentType === 2) {
        let analogPins = board.analogPins;
        const index = analogPins.indexOf(pinValue);
        analogPins = analogPins.splice(index, 1);
      }
      else {
        let digitalPins = board.digitalPins;
        const index = digitalPins.indexOf(pinValue);
        digitalPins = digitalPins.splice(index, 1);
      }
    }
  }
}

module.exports = {
  createComponent,
  returnComponents,
  returnComponentById,
  updateComponentById,
  deleteComponentById
}