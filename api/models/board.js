import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  model: {
    type: Number,
    required: true
  },
  port: {
    type: Number,
    required: true
  },
  analogPins: {
    type: [Number],
    required: true
  },
  digitalPins: {
    type: [Number],
    required: true
  }
});

module.exports = BoardSchema;