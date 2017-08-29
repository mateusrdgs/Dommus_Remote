const mongoose = require('mongoose'),
      RoomSchema = require('./room').RoomSchema,
      BoardSchema = require('./board');

mongoose.Promise = global.Promise;
const ResidenceSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  rooms: [RoomSchema],
  boards: [BoardSchema]
});

mongoose.model('Residence', ResidenceSchema);
module.exports = ResidenceSchema;