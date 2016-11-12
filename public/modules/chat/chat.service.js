(function() {
'use strict';

    angular
        .module('chatApp')
        .service('ChatService', ChatService);

    ChatService.$inject = ['userService','socketService', 'urls','$http'];
    function ChatService(userService, socket, urls, $http) {
        this.messages = [];
        var Chat = this;

        this.sendMessage = function(message){
            socket.send('message', message);
        };

        this.getMessages = function(data){
            return $http({
                url: urls.apiUrl+'messages',
                method:'GET',
                params: data
            });
        };

        this.clearChat = function(){
            this.messages.length = 0;
        };
    }        
})();