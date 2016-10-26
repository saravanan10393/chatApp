(function() {
'use strict';

    angular
        .module('chatApp')
        .service('userService', UserService);

    UserService.$inject = ['$http', 'urls', 'socket'];
    function UserService($http, urls, socket) {
        var hosturl = urls.apiUrl;
        var User = this;
        this.currentUser = false;
        this.userList = [];

        this.login = function(user){
            return $http({
                url: hosturl+'login',
                method:'post',
                data : user
            });
        };

        this.register = function(user){
            return $http({
                url: hosturl+'register',
                method:'post',
                data : user
            });
        };

        socket.on('userList', function (onlineUsers) {
            console.log('user list is ', onlineUsers);
            User.userList = onlineUsers;
        });

        socket.on('newUser', function (user) {
            console.log('new user', user);
            User.userList.unshift(user);
        });

    }
})();