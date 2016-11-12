var mongoose = require('mongoose');

var url = "mongodb://"+process.env.dbUser+":"+process.env.dbPassword+"@ds051368.mlab.com:51368/sara-test";
//var url = "mongodb://localhost:27017/chatapp";

mongoose.connect(url);

module.exports = {
    "User" : mongoose.model('User', require('./user.schema')),
    "Message": mongoose.model('Message', require('./message.schema'))
}; 