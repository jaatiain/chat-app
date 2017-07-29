'use strict';

angular.
  module('chatApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/login', {
          template: '<user-login></user-login>'
        }).
        when('/chat', {
          template: '<chat-view></chat-view>'
        }).
        otherwise('/login');
    }
  ]);
