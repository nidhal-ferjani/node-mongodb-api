// const MongoClient = require('mongodb').MongoClient;

const {MongoClient} =  require('mongodb');

const assert = require('assert');

// var user = { name : 'Mohamed Ali',age :28};

// var {name} = user;

// console.log(name);

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

MongoClient.connect(url,(err,client) => {

   if(err){
      return  console.log('Unable to connect Mongodb server');
   }
    //   assert.equal(null,err);
       console.log("Connected successfully to server");
       const db = client.db(dbName);

    //    db.collection('Todos').insertOne({
    //        text : 'Something to do',
    //        completed : false
    //    },(err,result) => {
    //         if(err){
    //           return console.log(`Unable to insert todo : ${err}`);
    //       }
    //         console.log(JSON.stringify(result.ops,undefined,2));

    //     });

    // db.collection('Users').insertOne({
    //     name : 'Ali',
    //     age : 30,
    //     location : 'Essaida rue 7 novembre cité elnour'
    // },(err,result) => {

    //     if(err){
    //         return console.log('Unable to insert User',err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());

    // });



       client.close();
   
});