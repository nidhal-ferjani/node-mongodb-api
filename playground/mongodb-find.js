// const MongoClient = require('mongodb').MongoClient;

const {MongoClient,ObjectID} =  require('mongodb');

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

    //    db.collection('Todos').find({_id : new ObjectID('5b8bcf628f82c43388b8a207')}).toArray().then((docs) => {
         
    //        console.log('Todos');
    //        console.log(JSON.stringify(docs,undefined,2));

    //    },(err) => {
      
    //       console.log('Unable to fetch tods',err);

    //    });

    db.collection('Users').find({name : 'Ali'}).count().then((count) => {

     console.log('Todos');
     console.log(`Number Todo in Todos = ${count}`);

    },(err) => {

        console.log('Unable to fetch tods',err);

    });


       client.close();
   
});