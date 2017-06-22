'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        title: 'Strona główna',
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'mainCtrl',
        params: {
          sort: 'dupa'
        }
      });
      
  });
