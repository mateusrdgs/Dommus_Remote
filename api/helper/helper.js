function sendJsonResponse(res, status, message) {
  res.status(status).send(message)  
}

module.exports = {
  sendJsonResponse
}