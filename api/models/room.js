import mongoose from 'mongoose';
import ComponentSchema from './component';

const RoomSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  components: [ComponentSchema]
});

module.exports = RoomSchema;