

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');



// {
//    email : 'nidhal.ferjani@gmail.com'
//    password : 'lehfsjegj'
//    token : [{
//            access : 'auth',
//            token : 'hjdfhjhfdbbghdgjjhjhjzezhejhj'
//    }]
// }

var UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
        minlength : 1,
        unique : true,
        validate : {
            validator : validator.isEmail,
            message :'{VALUE} is not a valid email' 

        },
        },
        password :{
            type : String,
            required : true,
            minlength : 6
        },
        tokens : [{
            access :{
                type : String,
                required : true
            },
            token :{
                type : String,
                required : true
            }
        }]
});


UserSchema.methods.toJSON = function(){

    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);


};


UserSchema.methods.generateAuthToken = function (){
    var user = this;
    var access ='auth';
   
    var token = jwt.sign({_id : user._id.toHexString(),access},'abc123').toString();
   
    user.tokens.push({access,token});
   
   
   return user.save().then(() =>{
              return token
   });
   
   };

  UserSchema.statics.findByToken = function(token){
    
    var User = this;
    var decoded ;

    try{
        decoded = jwt.verify(token,'abc123');
    }catch(err){

      return Promise.reject();
    }
   
  return  Promise.resolve(User.findOne({
        '_id' : decoded._id,
        'tokens.token' : token,
         'tokens.access' : 'auth'
    }));

  };

 UserSchema.pre('save',function (next) {

    var user = this;

   if(user.isModified('password')){
     bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
           user.password = hash;
           next();
        });
    });
}else{
    next();
}
  

});


UserSchema.statics.findByCredentials = function(email,password){

let User = this ;

 return User.findOne({email}).then((user) =>{
     if(!user){
        Promise.reject();   //  return callback(err,null) /
     }

     return new Promise ((resolve,reject) => {
        
         bcrypt.compare(password,user.password,(err,res) => {
        
            if(res){
            console.log(user);
            resolve(user);//  return   callback(null,user);// 
            }else{
                reject();//   return     callback(err,null);//
            }
   
         });
     });

 });

};


UserSchema.methods.removeToken = function(token) {

    let user = this;

   return user.update({
       $pull : {
           tokens : { token }
       }
    });

};

   var User = mongoose.model('User', UserSchema );




module.exports = {User};