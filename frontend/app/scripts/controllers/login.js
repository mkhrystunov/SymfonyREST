'use strict';

/**
 * @ngdoc function
 * @name restGalleryApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the restGalleryApp
 */
angular.module('restGalleryApp')
  .controller('LoginCtrl', function ($scope, OAuth, $location) {
    $scope.logIn = function () {
      $scope.dataLoading = true;
      OAuth.getAccessToken({
        username: $scope.username,
        password: $scope.password
      }).then(function () {
        $scope.dataLoading = false;
        $location.path('/');
      });
    };
  });
