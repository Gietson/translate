'use strict';

angular.module('app')
    .factory('Translate', function ($http) {
        return {
            query: function (query, callback) {
                if (query) {
                    $http.post('/api/translate/new', query
                    ).success(function (data) {
                        callback(null, data);
                    }).
                    error(function (err) {
                        callback(err);
                    });
                }
            }
        };
    })
    .factory('Memrise', function ($http) {
        return {
            query: function (query, callback) {
                if (query) {
                    $http.post('/api/translate/memrise', query
                    ).success(function (data) {
                        callback(null, data);
                    }).
                    error(function (err) {
                        callback(err);
                    });
                }
            }
        }
    });

