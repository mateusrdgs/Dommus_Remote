const mongoose = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      generateAnalogPins = require('../helper/generators').generateAnalogPins,
      generateDigitalPins = require('../helper/generators').generateDigitalPins,
      Account = mongoose.model('Account'),
      Board = mongoose.model('Board');

function createBoard(req, res) {
  const { idAccount, idResidence } = req.params;
  const { description, model, port } = req.body;
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
          const boards = residence.boards;
          boards.push(new Board({
            description,
            model,
            port,
            analogPins: generateAnalogPins(model),
            digitalPins: generateDigitalPins(model)
          }));
          account.save((error, account) => {
            if(error) {
              sendJsonResponse(res, 500, {
                'Error': error.errmsg
              });
              return;
            }
            else {
              const boardsLength = boards.length;
              sendJsonResponse(res, 201, {
                'Board': boards[boardsLength - 1]
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
    return;
  });
}

function returnBoards(req, res) {
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
          sendJsonResponse(res, 400, {
            'Message': 'No residence found!'
          });
          return;
        }
        else {
          const boards = residence.boards;
          if(!boards.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No boards found on this residence!'
            });
            return;
          }
          else {
            sendJsonResponse(res, 200, {
              'Boards': boards
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

function returnBoardById(req, res) {
  const { idAccount, idResidence, idBoard } = req.params;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'No accounts found!'
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
          const boards = residence.boards;
          if(!boards.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No boards found on this residence'
            });
            return;
          }
          else {
            const board = boards.id(idBoard);
            if(!board) {
              sendJsonResponse(res, 404, {
                'Message': 'No board found!'
              });
              return;
            }
            else {
              sendJsonResponse(res, 200, {
                'Board': board
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
  });
}

function updateBoardById(req, res) {
  const { idAccount, idResidence, idBoard } = req.params;
  const { description, model, port, analogPins, digitalPins } = req.body;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'No account found!'
      });        
    }
    else {
      const residences = account.residences;
      if(!residences.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No residences on this account!'
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
          const boards = residence.boards;
          if(!boards.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No boards on this residence!'
            });
            return;
          }
          else {
            const board = boards.id(idBoard);
            if(!board) {
              sendJsonResponse(res, 404, {
                'Message': 'No board found!'
              });
            }
            else {
              board.description = description || board.description;
              board.model = model || board.model;
              board.port = port || board.port;
              board.analogPins = analogPins || board.analogPins;
              board.digitalPins = digitalPins || board.digitalPins;
              account.save((error, account) => {
                if(error) {
                  sendJsonResponse(res, 500, {
                    'Error': error.errmsg
                  });
                  return;
                }
                else {
                  sendJsonResponse(res, 200, {
                    'Board': board
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

function deleteBoardById(req, res) {
  const { idAccount, idResidence, idBoard } = req.params;
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
          const boards = residence.boards;
          if(!boards.length) {
            sendJsonResponse(res, 404, {
              'Message': 'No boards found on this residence!'
            });
            return;
          }
          else {
            const board = boards.id(idBoard);
            if(!board) {
              sendJsonResponse(res, 404, {
                'Message': 'No board found!'
              });
              return;
            }        
            else {
              board.remove();
              account.save((error, account) => {
                if(error) {
                  sendJsonResponse(res, 500, {
                    'Error': error.errmsg
                  });
                  return;
                }
                else {
                  sendJsonResponse(res, 200, {
                    'Message': 'Board removed!'
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

module.exports = {
  createBoard,
  returnBoards,
  returnBoardById,
  updateBoardById,
  deleteBoardById
}