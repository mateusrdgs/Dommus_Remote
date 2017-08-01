function generateUnoAnalogPins() {
  let analogPins = [];
  for(let index = 0; index < 5; index++) {
    analogPins.push(index);
  }
  return analogPins;
}

function generateUnoDigitalPins() {
  let digitalPins = [];
  for(let index = 0; index < 10; index++) {
      digitalPins.push(index);
  }
  return digitalPins;
}

function generateMegaAnalogPins() {
  let analogPins = [];
  for(let index = 0; index < 16; index++) {
    analogPins.push(index);
  }
  return analogPins;
}

function generateMegaDigitalPins() {
  let digitalPins = [];
  for(let index = 0; index < 50; index++) {
    if(index !== 10)
      digitalPins.push(index);
  }
  return digitalPins;
}

function generateSwitch(digitalPin) {
  return {
    digitalPin
  }
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

function generateAnalogPins(model) {
  switch(parseInt(model)) {
    case 1:
      return generateUnoAnalogPins();
    case 2:
      return generateMegaAnalogPins();
    default:
      return;
  }
}

function generateDigitalPins(model) {
  switch(parseInt(model)) {
    case 1:
      return generateUnoDigitalPins();
    case 2:
      return generateMegaDigitalPins();
    default:
      return;
  }
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

module.exports = {
  generateComponent,
  generateAnalogPins,
  generateDigitalPins
};