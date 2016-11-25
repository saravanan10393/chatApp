(function () {
    'use strict';

    angular
        .module('chatApp')
        .controller('userController', UserController);

    UserController.$inject = ['$scope', '$state', 'toastr', 'userService', 'GooglePlus'];
    function UserController($scope, $state, toastr, userService, GooglePlus) {
        var vm = this;

        // GooglePlus.logout();

        vm.login = login;

        vm.register = register;

        vm.googleLogin = googleLogin;

        vm.fbLogin = fbLogin;

        vm.checkFacebookLogin = checkFacebookLogin;

        function login() {
            userService.login({ email: vm.email, password: vm.password }).then(function (success) {
                var data = success.data;
                if (data.error) {
                    toastr.error(data.message, 'Error');
                    return;
                }
                userService.currentUser = data;
                $state.go('home');

            }, function (error) {
                userService.currentUser = null;
                console.log('login error');
            });
        };

        function register(data) {
            var user = data ? data : { email: vm.email, password: vm.password, name: vm.name };
            userService.register(data).then(function (success) {
                var data = success.data;
                if (data.error) {
                    toastr.error(data.message, 'Error');
                    return;
                }
                userService.currentUser = data;
                $state.go('home');
            }, function (error) {
                userService.currentUser = null;
                console.log('registration error');
                GooglePlus.logout();
            });
        }

        function googleLogin(type) {
            GooglePlus.login().then(function (authResult) {
                console.log(authResult);
                var accessToken = authResult.access_token;

                GooglePlus.getUser().then(function (user) {
                    console.log(user);
                    if (type == 'register') {
                        register({ name: user.name, email: user.email, password: accessToken, imageUrl: user.picture });
                    } else {
                        getUser(user.email);
                    }
                });
            }, function (err) {
                console.log(err);
            });
        }

        function fbLogin(type) {
            FB.login(function (loginResponse) {
                console.log('fb login response ', loginResponse);
            },{scope: 'public_profile,email'});
        }

        function getUser(email) {
            userService.getUserByEmail(email).then(function (success) {
                console.log('data from server', success);
                userService.currentUser = success.data;
                $state.go('home');
            }, function (error) {
                userService.currentUser = null;
                //toastr.error(data.message,'Error');
                console.log('failed to get user details ', error)
                GooglePlus.logout();
            });
        }

        function checkFacebookLogin() {
            FB.getLoginStatus(function (response) {
                console.log('facebook login response ',response);
            });
        }
    }
})();

