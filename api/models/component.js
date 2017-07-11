import mongoose from 'mongoose';

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

module.exports = ComponentSchema;