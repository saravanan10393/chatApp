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
                templateUrl:'/modules/dashboard/home.html'
            })
            .state('home.chat', {
                url:'/chat/:id',
                controller:'chatController',
                controllerAs:'chatCtrl',
                templateUrl:'/modules/chat/chat.html'
            });
    });
})();