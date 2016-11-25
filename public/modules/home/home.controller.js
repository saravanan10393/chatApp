(function() {
'use strict';

    angular
        .module('chatApp')
        .controller('homeController', HomeController);

    HomeController.$inject = ['$scope','$state', 'userService', 'socketService', 'GooglePlus'];
    function HomeController($scope, $state, UserService, socket, GooglePlus) {
        var vm = this;
        if(!UserService.currentUser){
            $state.go('login');
            return;
        }

        //establish socket connection
        socket.connect(UserService.currentUser.id);

        vm.UserService = UserService;

       
        vm.gotoChat = function(userId){
            $state.go('home.chat',{userId:userId});
        };

        vm.signout = function () { 
            GooglePlus.logout();
            FB.logout(function(response) {
                // Person is now logged out
            });
            UserService.currentUser = null;
            socket.disconnect();
            $state.go('login');
        }
    }
})();