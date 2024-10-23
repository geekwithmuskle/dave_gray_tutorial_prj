const os = require('os');
const path = require('path');
const math = require('./math');

console.log('Addition:',math.add(2,6));
console.log('Subtraction:',math.sub(2,6));
console.log('Multiplication:',math.mul(2,6));
console.log('Division:',math.div(2,6));

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());
// console.log(os.hostname());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.parse(__filename));