'use strict';

angular.module('app', [
  'ngCookies',
  'ngResource',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'darthwade.dwLoading',
    'btford.socket-io',
    'toastr'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
   // $httpProvider.interceptors.push('authInterceptor');

  })
/*
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })
*/
  .run(function ($rootScope, $state) {
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
        window.document.title = toState.title + ' - PK';
    });

  });

