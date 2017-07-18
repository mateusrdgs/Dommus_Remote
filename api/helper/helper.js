function sendJsonResponse(res, status, message) {
  res.status(status).send(message)  
}

function generateAnalogPins(model) {
  if(model)
    return [];
}

function generateDigitalPins(model) {
  if(model)
    return [];
}

export {
  sendJsonResponse,
  generateAnalogPins,
  generateDigitalPins
}