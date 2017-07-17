import mongoose from 'mongoose';
import ComponentSchema from './component';

mongoose.Promise = global.Promise;
const RoomSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  components: [ComponentSchema]
});

mongoose.model('Room', RoomSchema);

export default RoomSchema;