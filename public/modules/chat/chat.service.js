(function() {
'use strict';

    angular
        .module('chatApp')
        .service('ChatService', ChatService);

    ChatService.$inject = ['userService','socket', 'urls'];
    function ChatService(userService, socket, urls) {
        this.messages = [];
        var Chat = this;
        
        socket.on('message', function(message){
            Chat.messages.push(message);
        });

        this.sendMessage = function(message){
            Chat.messages.push(message);
            socket.emit('message', message);
        };

        this.getMessages = function(){
            return $http.get(urls.API_URL+'getMessages');
        };

        this.clearChat = function(){
            this.messages.length = 0;
        };
    }        
})();