(function() {
'use strict';

    angular
        .module('chatApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','$state', 'userService', 'socket'];
    function HomeController($scope, $state, UserService, socket) {
        var vm = this;
        if(!UserService.currentUser){
            $state.go('login');
            return;
        }
        vm.userList = UserService.userList;
        
        vm.gotoChat = function(userId){
            $state.go('home.chat',{userId:userId});
        };
    }
})();