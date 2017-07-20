import mongoose from 'mongoose';
import { sendJsonResponse, parseInt } from '../helper/helper';
import componentGenerator from '../helper/componentGenerator';

const Account = mongoose.model('Account');
const Component = mongoose.model('Component');

function createComponent(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!req.params.idResidence) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else if(!req.params.idRoom) {
    sendJsonResponse(res, 400, {
      'Message': 'Room Id is required!'
    });
    return;
  }
  else if(!req.body.idBoard || !req.body.description || !req.body.type) {
    sendJsonResponse(res, 400, {
      'Message': 'Board Id, Component description and type are required!'
    });
    return;
  }
  else {
    const idAccount = req.params.idAccount;
    const idResidence = req.params.idResidence;
    const idRoom = req.params.idRoom;
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
                const components = room.components,
                      idBoard = req.body.idBoard,
                      description = req.body.description,
                      type = parseInt(req.body.type);
                let about;
                if(type < 1) {
                  sendJsonResponse(res, 400, {
                    'Message': 'Component type not allowed!'
                  });
                  return;         
                }
                else {
                  switch(type) {
                    case 1: {
                      const digitalPin = req.body.digitalPin;
                      if(!digitalPin) {
                        sendJsonResponse(res, 400, {
                          'Message': 'Digital pin is required!'
                        });
                        return;
                      }
                      else {
                        about = componentGenerator(type, digitalPin);
                      }
                    }
                      break;
                    case 2: {
                      const analogPin = req.body.analogPin,
                            frequency = req.body.frequency;                      
                      if(!analogPin || !frequency) {
                        sendJsonResponse(res, 400, {
                          'Message': 'Analog pin and frequency are required!'
                        });
                        return;
                      }      
                      else {
                        about = componentGenerator(type, analogPin, frequency);
                      }
                    }              
                      break;
                    case 3: {
                      const digitalPin = req.body.digitalPin,
                            rotation = req.body.rotation,
                            minRange = req.body.minRange,
                            maxRange = req.body.maxRange;
                      if(!digitalPin || !rotation || !minRange || !maxRange) {
                        sendJsonResponse(res, 400, {
                          'Message': 'Digital pin, rotation, minRange and maxRange are required!'
                        });
                        return;
                      }
                      else {
                       about = componentGenerator(type, digitalPin, rotation, minRange, maxRange);
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
                    components.push(new Component({
                      idBoard,
                      description,
                      type,
                      about
                    }));
                    account.save((error, account) => {
                      if(error) {
                        sendJsonResponse(res, 500, {
                          'Error': error.message
                        });
                        return;
                      }
                      else {
                        const componentsLength = room.components.length;
                        sendJsonResponse(res, 200, {
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
      }
    }, error => {
      sendJsonResponse(res, 500, {
        'Error': error.message
      });
      return;
    });
  }
}

function returnComponents(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!req.params.idResidence) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else if(!req.params.idRoom) {
    sendJsonResponse(res, 400, {
      'Message': 'Room Id is required!'
    });
    return;
  }
  else {
    const idAccount = req.params.idAccount;
    const idResidence = req.params.idResidence;
    const idRoom = req.params.idRoom;
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
    })    
  }
}

function returnComponentById(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!req.params.idResidence) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else if(!req.params.idRoom) {
    sendJsonResponse(res, 400, {
      'Message': 'Room Id is required!'
    });
    return;
  }
  else if(!req.params.idComponent) {
    sendJsonResponse(res, 400, {
      'Message': 'Component Id is required!'
    });
    return;
  }
  else {
    const idAccount = req.params.idAccount,
          idResidence = req.params.idResidence,
          idRoom = req.params.idRoom,
          idComponent = req.params.idComponent;
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
}

function updateComponentById(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!req.params.idResidence) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else if(!req.params.idRoom) {
    sendJsonResponse(res, 400, {
      'Message': 'Room Id is required!'
    });
    return;
  }
  else if(!req.params.idComponent) {
    sendJsonResponse(res, 400, {
      'Message': 'Component Id is required!'
    });
    return;
  }
  else if(!req.body.idBoard || !req.body.description || !req.body.type) {
    sendJsonResponse(res, 400, {
      'Message': 'Board Id, component description and type are required!'
    });
  }
  else {
    const idAccount = req.params.idAccount,
          idResidence = req.params.idResidence,
          idRoom = req.params.idRoom,
          idComponent = req.params.idComponent;
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
                    const idBoard = req.body.idBoard,
                          description = req.body.description,
                          type = parseInt(req.body.type);
                    component.idBoard = idBoard || component.idBoard;
                    component.description = description || component.description;
                    component.type = type || component.type;                    
                    switch(type) {
                      case 1: {
                        const digitalPin = req.body.digitalPin;                        
                        component.digitalPin = digitalPin || component.digitalPin;
                      }
                      break;
                      case 2: {
                        const analogPin = req.body.analogPin,
                              frequency = req.body.frequency;
                        component.analogPin = analogPin || component.analogPin;
                        component.frequency = frequency || component.frequency;
                      }
                      break;
                      case 3: {
                        const digitalPin = req.body.digitalPin,
                              rotation = req.body.rotation,
                              minRange = req.body.minRange,
                              maxRange = req.body.maxRange;
                        component.digitalPin = digitalPin || component.digitalPin;
                        component.rotation = rotation || component.rotation;
                        component.minRange = minRange || component.minRange;
                        component.maxRange = maxRange || component.maxRange;
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
                          'Error': error.message
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
}

function deleteComponentById(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else if(!req.params.idResidence) {
    sendJsonResponse(res, 400, {
      'Message': 'Residence Id is required!'
    });
    return;
  }
  else if(!req.params.idRoom) {
    sendJsonResponse(res, 400, {
      'Message': 'Room Id is required!'
    });
    return;
  }
  else if(!req.params.idComponent) {
    sendJsonResponse(res, 400, {
      'Message': 'Component Id is required!'
    });
    return;
  }
  else {
    const idAccount = req.params.idAccount,
          idResidence = req.params.idResidence,
          idRoom = req.params.isRoom,
          idComponent = req.params.idComponent;
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
              const room = room.id(idRoom);
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
}

export {
  createComponent,
  returnComponents,
  returnComponentById,
  updateComponentById,
  deleteComponentById
}