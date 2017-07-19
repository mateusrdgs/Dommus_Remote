import { parseInt } from './helper';

function generateAnalogPins(model) {
  switch(parseInt(model)) {
    case 1:
      return generateMegaAnalogPins();    
    default:
      return generateUnoAnalogPins();
  }
}

function generateDigitalPins(model) {
  switch(parseInt(model)) {
    case 1:
      return generateMegaDigitalPins();
    default:
      return generateUnoDigitalPins();
  }
}

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

export {
  generateAnalogPins,
  generateDigitalPins
}