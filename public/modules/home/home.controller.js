(function() {
'use strict';

    angular
        .module('chatApp')
        .controller('homeController', HomeController);

    HomeController.$inject = ['$scope','$state', 'userService', 'socketService'];
    function HomeController($scope, $state, UserService, socket) {
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
    }
})();