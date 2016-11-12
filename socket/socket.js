var db = require('../db/index');
var _ = require('lodash');

module.exports = function (io) {
    io.on('connection', function (socket) {

        db.User.updateStatus({id : socket.handshake.query.userId,status : true});
        //return all online users to newly joined users
        db.User.getOnlineUsers(function (users) {
            var connectedUserId = socket.handshake.query.userId;
            var currentUser = _.remove(users, function(user){ return user.id == connectedUserId });
            console.log('currentuser ',currentUser[0]);
            socket.emit('data', { type: 'userList', data: users });
            socket.join(connectedUserId);
            socket.broadcast.emit('data', {type:'newUser',data : currentUser[0]});
        });

        socket.on('message',function(message){
            db.Message.save(message.data, () => {
                socket.broadcast.to(message.data.to).emit('data', message);
            });
        });

        socket.on('disconnect', function () {
            db.User.updateStatus({id : socket.handshake.query.userId,status : false});
            socket.leave(socket.handshake.query.userId);
            socket.broadcast.emit('data', {type:"removeUser", data: {id : socket.handshake.query.userId}});
        });

    });
};