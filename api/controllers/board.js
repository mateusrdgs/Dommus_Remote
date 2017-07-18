import mongoose from 'mongoose';
import { 
  sendJsonResponse,
  generateAnalogPins,
  generateDigitalPins
} from '../helper/helper';

const Account = mongoose.model('Account');
const Board = mongoose.model('Board');

function createBoard(req, res) {
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
  else if(!req.body.description || !req.body.model || !req.body.port) {
    sendJsonResponse(res, 400, {
      'Message': 'Fields description, model and port are required!'
    });
    return;
  }
  else {
    const idAccount = req.params.idAccount,
          idResidence = req.params.idResidence;
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
            const boards = residence.boards,
                  description = req.body.description,
                  model = req.body.model,
                  port = req.body.port;
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
                  'Error': error.message
                });
                return;            
              }
              else {
                const boardsLength = boards.length;
                sendJsonResponse(res, 200, {
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
}

function returnBoards(req, res) {
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
    const idAccount = req.params.idAccount,
          idResidence = req.params.idResidence;
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
}

function returnBoardById(req, res) {
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
  else if(!req.params.idBoard) {
    sendJsonResponse(res, 400, {
      'Message': 'Board Id is required!'
    });
    return;
  }
  else {
    const idAccount = req.params.idAccount, 
          idResidence = req.params.idResidence, 
          idBoard = req.params.idBoard;
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
            'Message': 'No residences on this account!'
          });
          return;
        }
        else {
          const residence = residence.id(idResidence);
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
                'Message': 'No boards on this residence'
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
}

function updateBoardById(req, res) {
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
  else if(!req.params.idBoard) {
    sendJsonResponse(res, 400, {
      'Message': 'Board Id is required!'
    });
    return;
  }
  else if(!req.body.description || !req.body.model || !req.body.port || !req.body.analogPins.length || !req.body.digitalPins.length) {
    sendJsonResponse(res, 400, {
      'Message': 'Fields description, model, port, analogPins and digitalPins are required!'
    });
    return;
  }
  else {
    const idAccount = req.params.idAccount,
          idResidence = req.params.idResidence,
          idBoard = req.params.idBoard;
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
            const boards = residence.board;
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
                const description = req.body.description,
                      model = req.body.model,
                      port = req.body.port,
                      analogPins = req.body.analogPins,
                      digitalPins = req.body.digitalPins;
                board.description = description || board.description;
                board.model = model || board.model;
                board.port = port || board.port;
                board.analogPins = analogPins || board.analogPins;
                board.digitalPins = digitalPins || board.digitalPins;
                account.save((error, account) => {
                  if(error) {
                    sendJsonResponse(res, 500, {
                      'Error': error.message
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
}

function deleteBoardById(req, res) {
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
  else if(!req.params.idBoard) {
    sendJsonResponse(res, 400, {
      'Message': 'Board Id is required!'
    });
    return;
  }
  else {
    const idAccount = req.params.idAccount,
          idResidence = req.params.idResidence,
          idBoard = req.params.idBoard;
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
                return;
              }        
              else {
                board.remove();
                account.save((error, account) => {
                  if(error) {
                    sendJsonResponse(res, 500, {
                      'Error': error.message
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
    })
  }
}

export {
  createBoard,
  returnBoards,
  returnBoardById,
  updateBoardById,
  deleteBoardById
}