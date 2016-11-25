(function() {
    'use strict';

    angular.module('chatApp', [
        'ui.router',
        'ngAnimate', 
        'toastr',
        'rt.eventemitter'
    ]).constant('urls',{
        apiUrl : "https://little-chat.herokuapp.com/api/",
        //apiUrl : "http://localhost:3000/api/",
        googleApi: "https://accounts.google.com/o/oauth2/v2/auth"
        
    });
})();