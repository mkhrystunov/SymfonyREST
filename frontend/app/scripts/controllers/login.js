'use strict';

/**
 * @ngdoc function
 * @name restGalleryApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the restGalleryApp
 */
angular.module('restGalleryApp')
  .controller('LoginCtrl', function ($scope, OAuth) {
    var vm = this;

    vm.login = login;

    (function initController() {
      // reset login status
      OAuth.revokeToken();
    })();

    function login() {
      vm.dataLoading = true;
      OAuth.getAccessToken({
        username: vm.username,
        password: vm.password
      }).then(function (response) {
        console.log(response);
      });
      //AuthenticationService.Login(vm.username, vm.password, function (response) {
      //  if (response.success) {
      //    AuthenticationService.SetCredentials(vm.username, vm.password);
      //    $location.path('/');
      //  } else {
      //    FlashService.Error(response.message);
      //    vm.dataLoading = false;
      //  }
      //});
    }
  });
