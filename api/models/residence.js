import mongoose from 'mongoose';
import RoomSchema from './room';
import BoardSchema from './board';

mongoose.Promise = global.Promise;
const ResidenceSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  rooms: [RoomSchema],
  boards: [BoardSchema]
});

mongoose.model('Residence', ResidenceSchema);
export default ResidenceSchema;