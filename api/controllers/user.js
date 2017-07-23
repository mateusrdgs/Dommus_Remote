import mongoose from 'mongoose';
import { sendJsonResponse } from '../helper/helper';

const Account = mongoose.model('Account');
const User = mongoose.model('User');

function createUser(req, res) {
  const { idAccount } = req.params;
  const { name, type } = req.body;
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
          sendJsonResponse(res, 500, {
            'Error': error.errmsg
          });
          return;
        }
        else {
          const usersLength = users.length - 1;
          sendJsonResponse(res, 201, { 
            'User': users[usersLength]
          });
          return;
        }
      });
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
    return;
  });
}

function returnUsers(req, res) {
  const { idAccount } = req.params;
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
      if(!users.length) {
        sendJsonResponse(res, 404, {
          'Message': 'No users on this account!'
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
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
  });
}

function returnUserById(req, res) {
  const { idAccount, idUser } = req.params;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      console.log(idAccount, idUser);
      sendJsonResponse(res, 404, {
        'Message': 'Account not found!'
      });
      return;
    }
    else {
      console.log(idAccount, idUser);
      const users = account.users;
      if(!users) {
        sendJsonResponse(res, 404, {
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
          sendJsonResponse(res, 200, {
            'User': user
          });
          return;
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

function updateUserById(req, res) {
  const { idAccount, idUser } = req.params;
  const { name, type } = req.body;
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
      if(!users.length) {
        sendJsonResponse(res, 404, {
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
          user.name = name || user.name;
          user.type = type || user.type;
          account.save((error, account) =>  {
            if(error) {
              sendJsonResponse(res, 500, {
                'Error': error.errmsg
              });
            }
            else {
              sendJsonResponse(res, 200, {
                'User': user
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

function deleteUserById(req, res) {
  const { idAccount, idUser } = req.params;
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
                'Error': error.errmsg
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
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
    return;
  });
}

export {
  createUser,
  returnUsers,
  returnUserById,
  updateUserById,
  deleteUserById
}