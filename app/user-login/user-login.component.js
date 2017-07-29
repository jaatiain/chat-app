'use strict';

// Register `userLogin` component, along with its associated controller and template
angular.
  module('userLogin').
  component('userLogin', {
    templateUrl: 'user-login/user-login.template.html',
    controller: [ '$location', 'userService', 'socket',
      function UserLoginController($location, userService, socket) {
        this.user = userService.getUser();
        this.login = function() {
          userService.setUser(this.user);
          socket.emit('register user', { name: this.user }, function(data) {
            if (data) {
              $location.path('/chat');
            } else {
              window.alert("This user name is already used: " + userService.getUser());
              userService.setUser(null);
            }
          });
        }
      }
    ]
  });
