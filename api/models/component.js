const mongoose = require('mongoose'),
      rootOptions = { discriminatorKey: 'type' },
      childOptions = { discriminatorKey: 'type', _id: false };

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
  }  
}, rootOptions);

const SwitchSchema = new mongoose.Schema({
  digitalPin: {
    type: Number,
    required: true
  }
}, childOptions);

const ThermometherSchema = new mongoose.Schema({
  controller: {
    type: String,
    required: true
  },
  analogPin: {
    type: Number,
    required: true
  },
  frequency: {
    type: Number,
    required: true
  }
}, childOptions);

const MotionSchema = new mongoose.Schema({
  controller: {
    type: String,
    required: true
  },
  analogPin: {
    type: Number,
    required: true
  }
}, childOptions);

const SensorSchema = new mongoose.Schema({
  controller: {
    type: String,
    required: true
  },
  analogPin: {
    type: Number,
    required: true
  },
  frequency: {
    type: Number,
    required: true
  },
  threshold: {
    type: Number,
    required: true
  }
}, childOptions);

const ServoSchema = new mongoose.Schema({
  digitalPin: {
    type: Number,
    required: true
  },
  startAt: {
    type: Number,
    required: true
  },
  range: {
    type: [Number],
    required: true
  }
}, childOptions);

mongoose.model('Component', ComponentSchema);

module.exports = {
  ComponentSchema,
  SwitchSchema,
  ThermometherSchema,
  MotionSchema,
  SensorSchema,
  ServoSchema
};