(function() {
'use strict';

    angular
        .module('chatApp')
        .service('userService', UserService);

    UserService.$inject = ['$http', 'urls', 'socketService', '$rootScope'];
    function UserService($http, urls, socket, $rootScope) {
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

        this.getUserByEmail = function (email) { 
            return $http.get(hosturl+"get/"+email);
        };

        socket.on('userList', function (onlineUsers) {
            console.log('user list is ', onlineUsers);
            User.userList = onlineUsers;
            $rootScope.$apply();
        });

        socket.on('newUser', function (user) {
            console.log('new user', user);
            if(!_.findWhere(User.userList,{id : user.id})){
                User.userList.unshift(user);
                $rootScope.$apply();
            }
        });

    }
})();