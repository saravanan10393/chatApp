(function() {
'use strict';

    angular
        .module('chatApp')
        .controller('validationController', ControllerController);

    ControllerController.$inject = ['$scope','$location'];
    function ControllerController($scope, $location) {
        $scope.response = $location.search();

        console.log('location is ',$location.absUrl());
        console.log('authenticated user response ',$location.search());

    }
})();