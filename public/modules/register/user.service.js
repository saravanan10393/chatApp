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

        this.googleLogin = function () {
            var url = urls.googleApi;
            var params = {
                "response_type" : "token",
                "client_id": "622768319134-sgug998e6o24ep22e4l4v26big784qp1.apps.googleusercontent.com",
                "redirect_uri": "https://little-chat.herokuapp.com/#/validate",
                "scope": "profile email",
                "prompt": "select_account"
            };

            return $http({
                url : url,
                method : "GET",
                params : params
            });
        }

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