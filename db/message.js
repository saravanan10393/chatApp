var db = require('./schema/index');

module.exports = {
    save: (message, callback) => {
        var msg = new db.Message(message);
        msg.save((err, data) => {
            if (err) {
                callback({ error: true, message: "Faild to save message" });
                return;
            }
            callback(data);
        });
    },

    get: (from, to, callback) => {
        db.Message.find({ from: from, to: to }, (err, messages) => {
            if (err) {
                callback({ error: true, message: "Faild to get message" });
                return;
            }
            callback(messages);
        });
    }
};