(function() {
    'use strict';

    angular.module('chatApp', [
        'ui.router',
        'ngAnimate', 
        'toastr',
        'rt.eventemitter'
    ]).constant('urls',{
        apiUrl : "http://localhost:3000/api/"
    });
})();