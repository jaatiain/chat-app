'use strict';

// Define the `chatApp` module
angular.module('chatApp', [
  'ngRoute',
  'userService',
  'socketService',
  'chatView',
  'userLogin'
]).run(function($rootScope, $log, $location, userService) {
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    if (userService.getUser() == null) {
      if (next.template == '<chat-view></chat-view>') {
        $location.path( "/login" );
      }
    } else {
      if (next.template == '<user-login></user-login>') {
        $location.path( "/chat" );
      }
    }
  });
});
