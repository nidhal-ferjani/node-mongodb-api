var mongoose = require('mongoose');
const {colors} = require('../../config/configure');

mongoose.Promise = global.Promise;

const urlDB = 'mongodb://localhost:27017/TodoApp';

mongoose.connect(urlDB);

mongoose.connection
.on('error',(err) => {
    console.log(colors.error(`Unable to connect MongoDB DataBase ${err}`));
})
.on('open',() => {
    console.log(colors.verbose(`Connect to DataBase success`));
});

module.exports = {
    mongoose
};