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

        collection.findOneAndUpdate({
            _id : new ObjectID("5b8db04855213d09440a0584")},{

                $set:{
                  completed : 'true'
                }
            },{
                returnOriginal : false
            }
            ).then((result) => {
                      console.log(result);
            },(err) => {
              console.log('Unable to update Todo',err);
            });

        /*********************************************************************************************/

        db.collection('Users').findOneAndUpdate({
            _id : new ObjectID('5b8c1682f439992f103b3b88')},{
             $set : {
                 name :'Ahmed Mejri'
             },
             $inc :{
               age : 1
             }   
            },{
                returnOriginal : false
            }).then((result) => {
                console.log(result);
            },(err) => {
                console.log(`Unable to update user ${err}`);
            })


        client.close();

});