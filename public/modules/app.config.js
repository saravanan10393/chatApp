(function () {
    'use strict';

    angular.module('chatApp').config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider

            .state('login', {
                url: '/login',
                controller:'userController',
                controllerAs:'UserCtrl',
                templateUrl: '/modules/register/login.html'
            })
            .state('validate', {
                url: '/validate',
                controller:'validationController',
                templateUrl: '/modules/register/validation.html'
            })
            .state('register', {
                url: '/register',
                controller:'userController',
                controllerAs:'UserCtrl',
                templateUrl: '/modules/register/register.html'
            })
            .state('home', {
                url:'/home',
                controller:'homeController',
                controllerAs:'HomeCtrl',
                templateUrl:'/modules/home/home.html'
            })
            .state('home.chat', {
                url:'/chat/:userId',
                controller:'chatController',
                controllerAs:'ChatCtrl',
                templateUrl:'/modules/chat/chat.html'
            });
    });
})();