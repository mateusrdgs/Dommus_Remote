const mongoose = require('mongoose'),
      ComponentSchema = require('./component').ComponentSchema,
      SwitchSchema = require('./component').SwitchSchema,
      ThermometerSchema = require('./component').ThermometerSchema,
      LightSchema = require('./component').LightSchema,
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
      ThermometerComponent = RoomSchema.path('components').discriminator(2, ThermometerSchema),
      LightComponent = RoomSchema.path('components').discriminator(3, LightSchema),
      MotionComponent = RoomSchema.path('components').discriminator(4, MotionSchema),
      SensorComponent = RoomSchema.path('components').discriminator(5, SensorSchema),
      ServoComponent = RoomSchema.path('components').discriminator(6, ServoSchema);

module.exports = {
  RoomSchema,
  SwitchComponent,
  ThermometerComponent,
  LightComponent,
  MotionComponent,
  SensorComponent,
  ServoComponent
};