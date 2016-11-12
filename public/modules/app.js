(function() {
    'use strict';

    angular.module('chatApp', [
        'ui.router',
        'ngAnimate', 
        'toastr',
        'rt.eventemitter'
    ]).constant('urls',{
        apiUrl : "https://little-chat.herokuapp.com/api/"
    });
})();