var colors = require('colors/safe');

// set single property
// var error = colors.red;
// error('this is red');

// set theme
colors.setTheme({
 silly: 'rainbow',
 input: 'grey',
 verbose: 'cyan',
 prompt: 'grey',
 info: 'green',
 data: 'grey',
 help: 'cyan',
 warn: 'yellow',
 debug: 'blue',
 error: 'red'
});

module.exports = {
    colors
};