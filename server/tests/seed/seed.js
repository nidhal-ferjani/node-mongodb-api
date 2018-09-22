const {ObjectID}  = require('mongodb');

const {Todo} = require('../../models/todo');
const jwt = require('jsonwebtoken');
const {User} = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
       _id : userOneId ,
       email : 'nidhal.ferjani@gmail.com',
       password :'lehfsdg',
       tokens : [{
           access : 'auth',
           token : jwt.sign({_id : userOneId.toHexString(),access: 'auth'},'abc123').toString()
       }]
},{
    _id : userTwoId ,
    email : 'nidhal.feroujani@gmail.com',
    password :'lehmkfg'
   
}]

const todos = [
    { _id : new ObjectID(),
      text : 'first text for todos',
      completed : true
    },
    { _id : new ObjectID(),
      text : 'second text for todos'}
  ]

  
const populateTodos = (done) => {
    
     Todo.remove({}).then(() =>{
       return Todo.insertMany(todos);
   }).then(() => done());
  };

  const populateUsers = (done) => {
    
     User.remove({}).then(() =>{
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

     return Promise.all([userOne,userTwo]);

   }).then(() => done());
  };


   module.exports = {todos,populateTodos,users,populateUsers};   