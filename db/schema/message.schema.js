var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    from: {type: String, required : true},
    to: {type: String, required : true},
    message: {type : String}
});

messageSchema.set('toJSON', {
    virtuals: true
});

module.exports = messageSchema;