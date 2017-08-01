const mongoose = require('mongoose'),
      ComponentSchema = require('./component');

mongoose.Promise = global.Promise;
const RoomSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  components: [ComponentSchema]
});

mongoose.model('Room', RoomSchema);
module.exports = RoomSchema;