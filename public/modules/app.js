(function() {
    'use strict';

    angular.module('chatApp', [
        'ui.router',
        'ngAnimate', 
        'toastr',
        'rt.eventemitter',
        'googleplus'
    ]).constant('urls',{
        apiUrl : "https://little-chat.herokuapp.com/api/",
        //apiUrl : "http://localhost:3000/api/",
        googleApi: "https://accounts.google.com/o/oauth2/v2/auth"
        
    }).config(['GooglePlusProvider', function(GooglePlusProvider) {
        GooglePlusProvider.init({
            clientId: '622768319134-ejjbg6p0d05q6g21vtml0sqssv91vvs6.apps.googleusercontent.com',
            apiKey: 'AIzaSyCnqBHR4Ecv2RdT8eXELU23jEpl7sij33I',
            scopes : "profile email",
            prompt: "select_account"
        });

    }]);
})();