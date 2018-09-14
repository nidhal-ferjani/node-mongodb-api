var mongoose = require('mongoose');
const {colors} = require('../../config/configure');

mongoose.Promise = global.Promise;

const urlDB = 'mongodb://nidhal:azertyuiop1234@ds255282.mlab.com:55282/db-todos' ;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection
.on('error',(err) => {
    console.log(colors.error(`Unable to connect MongoDB DataBase ${err}`));
})
.on('open',() => {
    console.log(colors.verbose(`Connect to DataBase success ${mongoose.connection.db.databaseName}`));
});

module.exports = {
    mongoose
};