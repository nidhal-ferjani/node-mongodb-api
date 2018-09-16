var env = process.env.NODE_ENV || 'development';

console.log('**** env*****',env);

if(env === 'development'){
    process.env.PORT = 3500;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if(env === 'test'){
    process.env.PORT = 3500;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppc';
}else{
    process.env.MONGODB_URI = 'mongodb://nidhal:azertyuiop1234@ds255282.mlab.com:55282/db-todos'
}