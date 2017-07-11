import mongoose from 'mongoose';
import RoomSchema from './room';
import BoardSchema from './board';

const ResidenceSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  dependencies: [RoomSchema],
  boards: [BoardSchema]
});

module.exports = ResidenceSchema;