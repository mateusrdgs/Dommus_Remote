import mongoose from 'mongoose';
import { sendJsonResponse } from '../helper/helper';

const Account = mongoose.model('Account');
const Residence = mongoose.model('Residence');

function createResidence(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
  }
  else {
    if(!req.body.description || !req.body.url) {
      sendJsonResponse(res, 400, {
        'Message': 'Residence description and url are required!'
      });
    }
    else {
      const idAccount = req.params.idAccount;
      const description = req.body.description;
      const url = req.body.url;
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
          account.residences.push(new Residence({
            description,
            url
          }));
          account.save((error, account) => {
            if(error) {
              sendJsonResponse(res, 500, {
                'Error': error.message
              });
              return;
            }
            else {
              const residencesLength = account.residences.length;
              sendJsonResponse(res, 201, {
                'Residence': account.residences[residencesLength - 1]
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
  }
}

function returnResidences(req, res) {
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
        sendJsonResponse(res, 404, {
          'Message': 'Account not found!'
        });
      }
      else {
        const residences = account.residences;
        if(!residences.length) {
          sendJsonResponse(res, 404, {
            'Message': 'No residences found!'
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
}

function returnResidenceById(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else {
    if(!req.params.idResidence) {
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
          const residence = account.residences.id(idResidence);
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
      }, error => {
        sendJsonResponse(res, 500, {
          'Error': error.message
        });
        return;
      });
    }
  }
}

function updateResidenceById(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else {
    if(!req.params.idResidence) {
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
          if(!residences) {
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
              if(!req.body.description || !req.body.url) {
                sendJsonResponse(res, 400, {
                  'Message': 'Fields description and url are required!'
                });
                return;
              }
              else {
                residence.description = req.body.description || residence.description;
                residence.url = req.body.url || residence.url;
                account.save((error, account) => {
                  if(error) {
                    sendJsonResponse(res, 500, 'Error', {
                      'Error': error.message
                    });
                    return;
                  }
                  else {
                    sendJsonResponse(res, 200, {
                      'Residence': account.residences.id(idResidence)
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
}

function deleteResidenceById(req, res) {
  if(!req.params.idAccount) {
    sendJsonResponse(res, 400, {
      'Message': 'Account Id is required!'
    });
    return;
  }
  else {
    if(!req.params.idResidence) {
      sendJsonResponse(res, 400, {
        'Message': 'Residence Id is required!'
      });
    }
    else {
      const idAccount = req.params.idAccount;
      const idResidence = req.params.idResidence;
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
          if(!residences) {
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
              residence.remove();
              account.save((error, account) => {
                if(error) {
                  sendJsonResponse(res, 500, {
                    'Error': error.message
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
  }
}

export {
  createResidence,
  returnResidences,
  returnResidenceById,
  updateResidenceById,
  deleteResidenceById
}