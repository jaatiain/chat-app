'use strict';

angular.module('userService')
    .service('userService', function () {
        var property = null;

        return {
            getUser: function () {
                return property;
            },
            setUser: function(value) {
                property = value;
            }
        };
    });
