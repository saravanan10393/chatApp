var db = require('./schema/index');
var _ = require('underscore')._;

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

    get: function getMessages (from, to, callback, skipFetch)  {
        db.Message.find({ from: from, to: to }, (err, messages) => {
            if (err) {
                callback({ error: true, message: "Faild to get message" });
            }else{
                //this is for temperiorly get chat message of both users. need to get good way for it.
                if(skipFetch){
                    callback(messages);
                    return;
                }
                getMessages(to,from, (data) => {
                    if(!data.error){
                        data = data.concat(messages);
                        callback(_.sortBy(data, function (item) { 
                            console.log(item.sendTime +'==> time and jsvalue ==> ' + item.sendTime);
                            return item.sendTime;
                         }));
                    }else{
                        callback(data);
                    }
                }, true);
            }
        });
    }
};