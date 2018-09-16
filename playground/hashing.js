const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data ={
    id : 10
}

var token = jwt.sign(data,'myscret');

console.log('token',token);

var decoded = jwt.verify(token,'myscret1');

// var user = 'I am user number 3';

// var hash = SHA256(user).toString();


// console.log(`Message : ${hash}`);
