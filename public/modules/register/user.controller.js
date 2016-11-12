(function() {
'use strict';

    angular
        .module('chatApp')
        .controller('userController', UserController);

    UserController.$inject = ['$scope','$state', 'toastr', 'userService'];
    function UserController($scope, $state, toastr, userService) {
        var vm = this;
        
        vm.login = login;

        vm.register = register;

        function login() {
            userService.login({email:vm.email, password: vm.password}).then(function(success){
                var data = success.data;
                if(data.error){
                    toastr.error(data.message,'Error');
                    return;
                }
                userService.currentUser = data;
                $state.go('home');
                
            },function(error){
                userService.currentUser = null;
                console.log('login error');
            });
        };

        function register(){
            userService.register({email : vm.email, password : vm.password, name : vm.name}).then(function(success){
                var data = success.data;
                if(data.error){
                    toastr.error(data.message,'Error');
                    return;
                }
                userService.currentUser = data;
                $state.go('home');
            },function(error){
                userService.currentUser = null;
                console.log('registration error');
            });
        };
    }
})();