'use strict';

// Register `chatView` component, along with its associated controller and template
angular.
  module('chatView').
  component('chatView', {
    templateUrl: 'chat-view/chat-view.template.html',
    controller: [ '$location', '$timeout', 'userService', 'socket',
      function UserLoginController($location, $timeout, userService, socket) {
        var self = this;
        self.user = userService.getUser();
        self.users = [];
        self.messages = [];
        self.message = "";

        socket.on('init users', function(data) {
          self.users = data.users;
        });

        socket.on('chat message', function(data) {
          addMessage(data.message, data.user);
        });

        socket.emit('get users');

        self.logout = function() {
          socket.emit('release user');
          userService.setUser(null);
          $location.path('/login');
        }

        self.sendMessage = function() {
          socket.emit('chat message', self.message);
          addMessage(self.message, self.user);
          self.message = "";
        }

        var addMessage = function(message, user) {
          if (self.messages.lenth > 100) {
              self.messages.shift();
          }
          self.messages.push(user + ': ' + message);
          $timeout(function() {
            var scroller = document.getElementById("autoscroll");
            scroller.scrollTop = scroller.scrollHeight;
          }, 0, false);
        }
      }
    ]
  });
