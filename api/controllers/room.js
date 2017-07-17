import mongoose from 'mongoose';
import { sendJsonResponse } from '../helper/helper';

const Account = mongoose.model('Account');
const Room = mongoose.model('Room');

function createRoom(req, res) {
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
  else if(!req.body.description) {
    sendJsonResponse(res, 400, {
      'Message': 'Field description is required!'
    });
    return;
  }
  else {
    const idAccount = req.params.idAccount;
    const idResidence = req.params.idResidence;
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
            'Message': 'No residences found on this account!'
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
            const description = req.body.description;
            const room = new Room({
              description
            });
            residence.rooms.push(room);
            account.save((error, account) => {
              if(error) {
                sendJsonResponse(res, 500, {
                  'Error': error.message
                });
                return;
              }
              else {
                const roomsLength = residence.rooms.length;
                sendJsonResponse(res, 200, {
                  'Room': residence.rooms[roomsLength - 1]
                });
                return;
              }
            });            
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

function returnRooms(req, res) {
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
  else {
    const idAccount = req.params.idAccount;
    const idResidence = req.params.idResidence;
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
            'Message': 'No residences found!'
          });
        }
        else {
          const residence = residences.id(idResidence);
          if(!residence) {
            sendJsonResponse(res, 404, {
              'Message': 'No residences found on this account!'
            });
            return;
          }
          else {
            const rooms = residence.rooms;
            if(!rooms) {
              sendJsonResponse(res, 404, {
                'Message': 'No rooms found!'
              });
              return;
            }
            else {
              sendJsonResponse(res, 200, {
                'Rooms': rooms
              });
              return;
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

function returnRoomById(req, res) {
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
          'Message': 'Account not found!'
        });
        return;
      }
      else {
        const residences = account.residences;
        if(!residences.length) {
          sendJsonResponse(res, 404, {
            'Message': 'No residences found on this account!'
          });
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
                'Message': 'No rooms found!'
              });
              return;
            }
            else {
              const room = residence.rooms.id(idRoom);
              if(!room) {
                sendJsonResponse(res, 404, {
                  'Message': 'No room found!'
                });
                return;
              }
              else {
                sendJsonResponse(res, 200, {
                  'Room': room
                });
                return;
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

function updateRoomById(req, res) {
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
  else if(!req.body.description) {
    sendJsonResponse(res, 400, {
      'Message': 'Field description is required!'
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
        sendJsonResponse(res, 400, {
          'Message': 'Account not found!'
        });
        return;
      }
      else {
        const residences = account.residences;
        if(!residences.length) {
          sendJsonResponse(res, 404, {
            'Message': 'No residences found on this account!'
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
                'Message': 'No rooms found on this account!'
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
                const description = req.body.description;
                room.description = description || room.description;
                account.save((error, account) => {
                  if(error) {
                    sendJsonResponse(res, 500, {
                      'Error': error.message
                    });
                    return;
                  }
                  else {
                    sendJsonResponse(res, 200, {
                      'Room': room
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
}

function deleteRoomById(req, res) {
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
          'Message': 'Account not found!'
        });
        return;
      }
      else {
        const residences = account.residences;
        if(!residences.length) {
          sendJsonResponse(res, 404, {
            'Message': 'No residences found on this account!'
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
                'Message': 'No rooms found on this account!'
              });
              return;
            }
            else {
              const room = rooms.id(idRoom);
              room.remove();
              account.save((error, account) => {
                if(error) {
                  sendJsonResponse(res, 500, {
                    'Error': error.message
                  });
                  return;
                }
                else {
                  sendJsonResponse(res, 200, {
                    'Message': 'Room removed!'
                  });
                  return;
                }
              });
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
  createRoom,
  returnRooms,
  returnRoomById,
  updateRoomById,
  deleteRoomById
}