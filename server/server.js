require('../config/config');

const _ = require('lodash');
const {colors} = require('../config/configure');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {authenticate} = require('./middleware/authenticate');
//const port = process.env.PORT || 3500 ;

var app = express();

app.use(bodyParser.json());

app.set('port',process.env.PORT);

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



/*****************************************************************************************/

app.get('/todos/:id',(req,res) => {
    
        var id = req.params.id;

        if(!ObjectID.isValid(id)){
          return res.status(404).send();
        }
       
        Todo.findById(id).then((todo) => {

            (!todo) ?  res.status(404).send() :  res.send({todo});

        },(err) => {
            res.status(400).send(err);
        })
    });


/********************************************************************************************/

app.get('/todos',(req,res) => {

  Todo.find().then((todos) => {

    res.send({
         todos
    });
  },(err) => {
       res.status(400).send(err);
  })

});
/*********************************************************************************************/

app.delete('/todos/:id',(req,res) => {

    var id = req.params.id;
    
            if(!ObjectID.isValid(id)){
              return res.status(404).send();
            }

            Todo.findByIdAndRemove(id).then((todo) => {
                (!todo) ?  res.status(404).send() :  res.send({todo});
            }).catch((err) => res.status(400).send() );

});

/*********************************************************************************************/

app.patch('/todos/:id', (req,res) => {

    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);


    if(!ObjectID.isValid(id)){
        return res.status(404).send();
      }

      if(_.isBoolean(body.completed) && body.completed){
          
         body.completedAt = new Date().getTime();
     }else{
         body.completed = false;
         body.completedAt = null;
      }

      Todo.findByIdAndUpdate(id,{
        $set : body 
       },{
           new : true
       }).then((todo) => {
        (!todo) ?  res.status(404).send() :  res.send({todo});
       }).catch((err) => res.status(400).send(err));

});
/**********************************************************************************************/

app.post('/users',(req,res) => {

  var body = _.pick(req.body,['email','password']);

 

  var user = new User(body);

 

  user.save().then(() =>{   
    return user.generateAuthToken();
  }).then((token) => {
 
    res.header('x-auth',token).send(user);
   }).catch((err) => {
    console.log(err);   
    res.status(400).send(err)
   });


});
/*********************************************************************************************/


app.get('/users/me',authenticate,(req,res) => {

    res.send(req.user);
    
});


/*********************************************************************************************/

app.post('/users/login',(req,res) => {

    let body = _.pick(req.body,['email','password']);
   
/************************************************************************/
/**************     With Promise function                      **********/
/************************************************************************/

    User.findByCredentials(body.email,body.password).then((user) => {
     
       return user.generateAuthToken().then((token) => {
          
            res.header('x-auth',token).send(user);

        });
    
    }).catch((err) => res.status(400).send());

/************************************************************************/
/**************     With callback function                     **********/
/************************************************************************/


 /* User.findByCredentials(body.email,body.password,(err,user)=>{

        console.log(user);
   
        if(err){
         return   res.status(400).send();
        }
        user.generateAuthToken().then((token) => {
            
              res.header('x-auth',token).send(user);
  
          }).catch((err) => res.status(400).send());

    });*/


});

/*********************************************************************************************/


app.delete('/users/me/token',authenticate,(req,res) => {
    
        req.user.removeToken(req.token).then(()=>{

            res.status(200).send();

        },() => res.status(400).send());

        
    });

/**********************************************************************************************/

app.listen(app.get('port'),() => {
    
        console.log(`Server Started up at port ${app.get('port')}`);
    });


    module.exports = { app };