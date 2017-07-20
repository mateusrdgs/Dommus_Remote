function generateSwitch(digitalPin) {
  return {
    digitalPin
  };
}

function generateSensor(analogPin, frequency) {
  return {
    analogPin, 
    frequency
  };
}

function generateServo(digitalPin, rotation, minRange, maxRange) {
  return {
    digitalPin,
    rotation,
    minRange,
    maxRange
  };
}

function generateComponent(type) {
  const args = Array.prototype.slice.call(arguments);
  switch(type) {
    case 1:
      return generateSwitch(args[0]);
    case 2:
      return generateSensor(args[0], args[1]);
    case 3:
      return generateServo(args[0], args[1], args[2], args[3]);
    default:
      return;
  }
}

export default generateComponent;