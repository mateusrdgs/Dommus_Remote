function sendJsonResponse(res, status, message) {
  res.status(status).send(message)  
}

function parseInt(input) {
  return Number.parseInt(input) || 0;
}

export {
  sendJsonResponse,
  parseInt
}