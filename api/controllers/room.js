const mongoose = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      Account = mongoose.model('Account'),
      Room = mongoose.model('Room');

function createRoom(req, res) {
  const { idAccount, idResidence } = req.params;
  const { description } = req.body;  
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
          rooms.push(new Room({
            description
          }));          
          account.save((error, account) => {
            if(error) {
              sendJsonResponse(res, 500, {
                'Error': error.errmsg
              });
              return;
            }
            else {
              const roomsLength = rooms.length;
              sendJsonResponse(res, 201, {
                'Room': rooms[roomsLength - 1]
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

function returnRooms(req, res) {
  const { idAccount, idResidence } = req.params;
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
              'Message': 'No rooms found on this residence!'
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

function returnRoomById(req, res) {
  const { idAccount, idResidence, idRoom } = req.params;
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
              'Message': 'No rooms found on this residence!'
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

function updateRoomById(req, res) {
  const { idAccount, idResidence, idRoom } = req.params;
  const { description } = req.body;
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
              'Message': 'No rooms found on this residence!'
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
              room.description = description || room.description;
              account.save((error, account) => {
                if(error) {
                  sendJsonResponse(res, 500, {
                    'Error': error.errmsg
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

function deleteRoomById(req, res) {
  const { idResidence, idRoom, idAccount } = req.params;
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
              'Message': 'No rooms found on this residence!'
            });
            return;
          }
          else {
            const room = rooms.id(idRoom);
            room.remove();
            account.save((error, account) => {
              if(error) {
                sendJsonResponse(res, 500, {
                  'Error': error.errmsg
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

module.exports = {
  createRoom,
  returnRooms,
  returnRoomById,
  updateRoomById,
  deleteRoomById
}