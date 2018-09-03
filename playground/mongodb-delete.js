const {MongoClient,ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url,(err,client) => {

    if(err){
        return  console.log('Unable to connect Mongodb server');
     }
      
         console.log("Connected successfully to server");
         const db = client.db(dbName);

        var collection = db.collection('Todos');

       

        collection.findOneAndDelete({ _id  : new ObjectID("5b8bccab34f92e2b70ff1f4d")}).then((result) => {
            console.log(JSON.stringify(result,undefined,2));
        },(err) => {



        });
         

      client.close();

});