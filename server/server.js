const {colors} = require('../config/configure');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


/*********************************************************************************************/



/**********************************************************************************************/

app.post('/todos',(req,res) => {
  var todo = new Todo({
      text : req.body.text
  })

  todo.save().then((doc)=> {
        res.send(doc);
    },(err) => {
        res.status(400).send(err);
    });


});






// newUser.save().then((doc)=> {
//     console.log(JSON.stringify(doc,undefined,2));
// },(err) => {
//     console.log(colors.error(`Unabe to save Todo : ${err}`));
// });




app.listen(3500,() => {
    
        console.log('Server is up in port 3500');
    });