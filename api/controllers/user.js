import mongoose from 'mongoose';
import { sendJsonResponse } from '../helper/helper';

const Account = mongoose.model('Account');
const User = mongoose.model('User');

function createUser(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else {
    if(!req.body.name || !req.body.type) {
      sendJsonResponse(res, 400, {
        'Error': 'Name and Type fields are required!'
      });
      return;
    }
    else {
      const idAccount = req.params.idAccount;
      const name = req.body.name;
      const type = req.body.type;
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
          const users = account.users;
          users.push(new User({
            name,
            type
          }));          
          account.save((error, account) => {
            if(error) {
              sendJsonResponse(res, 400, {
                'Error': error
              });
              return;
            }
            else {
              const lastIndex = users.length - 1;              
              sendJsonResponse(res, 200, { 
                'User': users[lastIndex]
              });
              return;
            }
          });
        }
      }, error => {
        sendJsonResponse(res, 400, {
          'Error': error.message
        });
        return;
      });
    }
  }
}

function returnUsers(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else {
    const idAccount = req.params.idAccount;
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
        const users = account.users;
        if(!users.length) {
          sendJsonResponse(res, 400, {
            'Message': 'No users found!'
          });
          return;
        }
        else {
          sendJsonResponse(res, 200, {
            'Users': users
          });
        }
      }
    }, error => {
      sendJsonResponse(res, 400, {
        'Error': error.message
      });
    });
  }
}

function returnUserById(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else {
    if(!req.params.idUser) {
      sendJsonResponse(res, 400, {
        'Message': 'User Id is required!'
      });
      return;
    }
    else {
      const idAccount = req.params.idAccount;
      const idUser = req.params.idUser;
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
          const users = account.users;
          if(!users) {
            sendJsonResponse(res, 404, {
              'Message': 'No Users on this account!'
            });
            return;
          }
          else {            
            const user = users.id(idUser);            
            if(!user) {
              sendJsonResponse(res, 404, {
                'Message': 'User not found!'
              });
              return;
            }
            else {              
              sendJsonResponse(res, 200, {
                'User': user
              });
              return;
            }
          }
        }
      }, error => {
        sendJsonResponse(res, 400, {
          'Error': error.message
        });
        return;
      });
    }
  }
}

function updateUserById(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else {
    if(!req.params.idUser) {
      sendJsonResponse(res, 400, {
        'Message': 'User Id is required!'
      });
      return;
    }
    else {
      const idAccount = req.params.idAccount;
      const idUser = req.params.idUser;
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
          const users = account.users;
          if(!users) {
            sendJsonResponse(res, 400, {
              'Message': 'No users on this account!'
            });
            return;
          }
          else {            
            const user = users.id(idUser);
            if(!user) {
              sendJsonResponse(res, 404, {
                'Message': 'User not found!'
              });
              return;
            }
            else {
              if(!req.body.name || !req.body.type) {
                sendJsonResponse(res, 400, {
                  'Message': 'User name and type are required!'
                });
              }
              else {
                user.name = req.body.name || user.name;
                user.type = req.body.type || user.type;
                account.save((error, account) =>  {
                  if(error) {
                    sendJsonResponse(res, 400, {
                      'Error': error.message
                    });
                  }
                  else {
                    sendJsonResponse(res, 200, {
                      'User': account.users.id(idUser)
                    });
                    return;
                  }
                })
              }
            }
          }
        }
      }, error => {
        sendJsonResponse(res, 400, {
          'Error': error.message
        });
      });
    }
  }
}

function deleteUserById(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else {
    if(!req.params.idUser) {
      sendJsonResponse(res, 400, {
        'Message': 'User Id is required!'
      });
      return;
    }
    else {
      const idAccount = req.params.idAccount;
      const idUser = req.params.idUser;
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
          const users = account.users;
          if(!users) {
            sendJsonResponse(res, 400, {
              'Message': 'No users on this account!'
            });
            return;
          }
          else {
            const user = users.id(idUser);
            if(!user) {
              sendJsonResponse(res, 400, {
                'Message': 'User not found!'
              });
              return;
            }
            else {
              user.remove();
              account.save((error, account) => {
                if(error) {
                  sendJsonResponse(res, 400, {
                    'Error': error.message
                  });
                  return;
                }
                else {
                  sendJsonResponse(res, 200, {
                    'Message': 'User removed!'
                  });
                  return;
                }
              });            
            }
          }          
        }
      }, error => {
        sendJsonResponse(res, 400, {
          'Error': error.message
        });
        return;
      });
    }
  }
}

export {
  createUser,
  returnUsers,
  returnUserById,
  updateUserById,
  deleteUserById
}