(function() {
'use strict';

    angular
        .module('chatApp')
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$scope', '$state', '$stateParam','userService', 'socket', 'ChatService'];
    function ChatController($scope, $state, $stateParam, UserService, socket, ChatService) {
        var vm = this;
        vm.messages = ChatService.messages;

        if($stateParam.userId){
            vm.to = _.where(UserService.userList, {id : $stateParam.userId});
        }

        vm.from = UserService.currentUser;

        //fetch the conversattion messages limit is 100;
        ChatService.getMessages({from : vm.from.id, to: vm.to.id}).then(function(response){
            vm.messages.length = 0;
            if(response.data.error){
                toastr.error(response.data.message,'Error');
            }else{
                vm.messages = response.data.messages;
            }
        });

        vm.send = function(text){
            var message = {
                from : vm.from.id,
                to: vm.to.id,
                message : text
            };
            ChatService.send(message);
            this.messages.push(message);
        };
        
    }
})();