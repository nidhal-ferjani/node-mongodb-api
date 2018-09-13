const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

const {ObjectID} = require('mongodb');


// Todo.remove({}).then((result) => {
//     console.log('Resultat : ',result);
// });

Todo.findByIdAndRemove('5b9a8cb41833e711ada873fb').then((result) => {

   console.log('resultat : ',result);
});