(function() {
'use strict';

    angular
        .module('chatApp')
        .controller('chatController', ChatController);

    ChatController.$inject = ['$scope', '$state', '$stateParams','userService', 'ChatService', 'socketService'];
    function ChatController($scope, $state, $stateParams, UserService, ChatService, socket) {
        var vm = this;
        vm.messages = ChatService.messages;

        if($stateParams.userId){
            vm.to = _.findWhere(UserService.userList, {id : $stateParams.userId});
        }

        vm.from = UserService.currentUser;

        //fetch the conversattion messages limit is 100;
        ChatService.getMessages({from : vm.from.id, to: vm.to.id}).then(function(response){
            vm.messages.length = 0;
            if(response.data.error){
                toastr.error(response.data.message,'Error');
            }else{
                vm.messages = response.data;
            }
        });

        vm.send = function(text){
            vm.txtMsg = null;
            var message = {
                from : vm.from.id,
                to: vm.to.id,
                message : text,
                sendTime : Date.now()
            };
            ChatService.sendMessage(message);
            this.messages.push(message);
        };

        socket.on('message', function(message){
            console.log('socket message ',message);
            if(message.to == vm.from.id){
                vm.messages.push(message);
                $scope.$apply();
            }
        });
    }
})();