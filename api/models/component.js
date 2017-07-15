import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const ComponentSchema = new mongoose.Schema({
  board: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  about: mongoose.Schema.Types.Mixed
});

export default ComponentSchema;