const mongoose = require('mongoose'),
      ComponentSchema = require('./component').ComponentSchema,
      SwitchSchema = require('./component').SwitchSchema,
      ThermometherSchema = require('./component').ThermometherSchema,
      MotionSchema = require('./component').MotionSchema,
      SensorSchema = require('./component').SensorSchema,
      ServoSchema = require('./component').ServoSchema;

mongoose.Promise = global.Promise;
const RoomSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  components: [ComponentSchema]
});

mongoose.model('Room', RoomSchema);

const SwitchComponent = RoomSchema.path('components').discriminator(1, SwitchSchema),
      ThermometherComponent = RoomSchema.path('components').discriminator(2, ThermometherSchema),
      MotionComponent = RoomSchema.path('components').discriminator(3, MotionSchema),
      SensorComponent = RoomSchema.path('components').discriminator(4, SensorSchema),
      ServoComponent = RoomSchema.path('components').discriminator(5, ServoSchema);

module.exports = {
  RoomSchema,
  SwitchComponent,
  ThermometherComponent,
  MotionComponent,
  SensorComponent,
  ServoComponent
};