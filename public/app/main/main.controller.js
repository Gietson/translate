'use strict';

angular.module('app')

    .controller('mainCtrl', function ($scope, $http, Translate, $loading, $cookieStore, toastr) {

        $scope.login = $cookieStore.get('login');
        $scope.password = $cookieStore.get('password');
        $scope.title = $cookieStore.get('title');

        $scope.memriseAuth = function () {
            if ($scope.login && $scope.password && $scope.title) {
                $cookieStore.put("login", $scope.login);
                $cookieStore.put("password", $scope.password);
                $cookieStore.put("title", $scope.title);
                $(".collapse").collapse('hide');
                toastr.success('Dane zostały zapisane!')
            }
            else {
                toastr.error('Wpisz poprawne ustawienia memrise!');
            }
        };


        $scope.translate = function () {
            if (!$scope.login || !$scope.password || !$scope.title) {
                $(".collapse").collapse('show')
                toastr.error('Wpisz poprawne ustawienia memrise!');
                return;
            }

            if ($scope.english) {
                $loading.start('translate');
                toastr.info('Rozpoczynam wyszukiwanie tłumaczenia słowa: ' + $scope.english);

                $scope.data = null;

                var query = {
                    eng: $scope.english.trim()
                };

                Translate.query(query, function (err, data) {
                    if (err) {
                        toastr.error('Bład podczas tlumaczenia: '+ err);
                        //console.log('err=' + JSON.stringify(err));
                        //return;
                    }
                    console.log(data);
                    $scope.data = data;

                    $loading.finish('translate');
                });
            } else {
                toastr.error('Zapomniałeś wpisać słowa do tłumaczenia..')
            }
        };

    });