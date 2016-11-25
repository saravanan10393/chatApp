var mongoose = require('mongoose');

var user = mongoose.Schema({
    email : String,
    password : String,
    name : String,
    status : {type:Boolean, Default : false},
    isSocial: {type:Boolean, Default : false},
    authType: {type:String, Default : null},
    imageUrl : String,
});

user.set('toJSON', {
    virtuals: true
});

module.exports = user;