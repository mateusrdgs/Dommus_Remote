const mongoose = require('mongoose'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      Account = mongoose.model('Account'),
      Residence = mongoose.model('Residence');

function createResidence(req, res) {
  const { idAccount } = req.params;
  const { description, url } = req.body;
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
      residences.push(new Residence({
        description,
        url
      }));
      account.save((error, account) => {
        if(error) {
          sendJsonResponse(res, 500, {
            'Error': error.errmsg
          });
          return;
        }
        else {
          const residencesLength = residences.length;
          sendJsonResponse(res, 201, {
            'Residence': residences[residencesLength - 1]
          });
          return;
        }
      })
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
  });
}

function returnResidences(req, res) {  
  const { idAccount } = req.params;
  Account
  .findById(idAccount)
  .then(account => {
    if(!account) {
      sendJsonResponse(res, 404, {
        'Message': 'Account not found!'
      });
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
        sendJsonResponse(res, 200, {
          'Residences': residences
        });
        return;
      }
    }
  }, error => {
    sendJsonResponse(res, 500, {
      'Error': error.message
    });
    return;
  });
}

function returnResidenceById(req, res) {
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
            'Message': 'Residence not found!'
          });
          return;
        }
        else {
          sendJsonResponse(res, 200, {
            'Residence': residence
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

function updateResidenceById(req, res) {
  const { idAccount, idResidence } = req.params;
  const { description, url } = req.body;
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
        sendJsonResponse(res, 400, {
          'Message': 'No residences on this account!'
        });
        return;
      }
      else {
        const residence = residences.id(idResidence);
        if(!residence) {
          sendJsonResponse(res, 404, {
            'Message': 'Residence not found!'
          });
          return;
        }
        else {
          residence.description = description || residence.description;
          residence.url = url || residence.url;
          account.save((error, account) => {
            if(error) {
              sendJsonResponse(res, 500, 'Error', {
                'Error': error.errmsg
              });
              return;
            }
            else {
              sendJsonResponse(res, 200, {
                'Residence': residence
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

function deleteResidenceById(req, res) {
  const { idAccount, idResidence } = req.params;
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
        sendJsonResponse(res, 400, {
          'Message': 'No residences found on this account!'
        });
        return;
      }
      else {
        const residence = residences.id(idResidence);
        if(!residence) {
          sendJsonResponse(res, 404, {
            'Message': 'Residence not found!'
          });
          return;
        }
        else {
          residence.remove();
          account.save((error, account) => {
            if(error) {
              sendJsonResponse(res, 500, {
                'Error': error.errmsg
              });
              return;
            }
            else {
              sendJsonResponse(res, 200, {
                'Message': 'Residence removed!'
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

module.exports = {
  createResidence,
  returnResidences,
  returnResidenceById,
  updateResidenceById,
  deleteResidenceById
}