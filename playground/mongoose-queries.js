const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

const {ObjectID} = require('mongodb');

var id = '5b990164df51d7164cfdb7fd11';

if (!ObjectID.isValid(id)){
        console.log('ID not valid');
}else{

        Todo.find({
          _id : id
      }).then((todos) => {
        console.log('Todos : ',todos);
      });

      Todo.findOne({
        _id : id
      }).then((todo) => {
      console.log(`Todo : ${todo}`);
      });



      Todo.findById(id).then((todo) => {
          
            if(!todo){
              return console.log('Id not found');
            }
            console.log('Todo by Id : ',JSON.stringify(todo,undefined,2));
          }).catch((err) => console.log(err)) ;

}



