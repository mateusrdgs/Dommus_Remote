import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const ComponentSchema = new mongoose.Schema({
  idBoard: {
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

mongoose.model('Component', ComponentSchema);

export default ComponentSchema;