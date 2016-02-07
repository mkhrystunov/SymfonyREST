'use strict';

/**
 * @ngdoc overview
 * @name restGalleryApp
 * @description
 * # restGalleryApp
 *
 * Main module of the application.
 */
angular
  .module('restGalleryApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'angular-oauth2',
    'file-model',
    'ui.bootstrap'
  ])
  .value('backend_url', 'http://localhost:8000')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/photos.html',
        controller: 'PhotosCtrl',
        controllerAs: 'photos'
      })
      .when('/photos/add', {
        templateUrl: 'views/photo-form.html',
        controller: 'PhotosEditCtrl',
        controllerAs: 'photos'
      })
      .when('/photos/:id/edit', {
        templateUrl: 'views/photo-form.html',
        controller: 'PhotosEditCtrl',
        controllerAs: 'photos'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['OAuthProvider', function (OAuthProvider) {
    OAuthProvider.configure({
      baseUrl: 'http://localhost:8000',
      clientId: '1_3nx0xp632jc4cwwsko4c04c80ogwwcc8so40kosss0gwg00s48',
      clientSecret: '355tqpf8p7acgkw08488ocg4c0osg0gc4kwgococgckkkc0so4',
      grantPath: 'oauth/v2/token'
    });
  }])
  .config(['OAuthTokenProvider', function (OAuthTokenProvider) {
    OAuthTokenProvider.configure({
      name: 'token',
      options: {
        secure: false
      }
    });
  }])
  .run(['$rootScope', '$location', 'OAuth', '$q', function($rootScope, $location, OAuth, $q) {
    $rootScope.$on('oauth:error', function(event, rejection) {
      if ('invalid_token' === rejection.data.error) {
        OAuth.getRefreshToken();
      }

      $location.path('/login');

      return $q.reject(rejection);
    });
  }])
  .factory('OAuthHttpInterceptor', function ($q, $rootScope) {
    return {
      responseError: function (rejection) {
        if (401 === rejection.status) {
          $rootScope.$emit('oauth:error', rejection);
        }
        return rejection;
      }
    };
  })
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('OAuthHttpInterceptor');
  }])
  .factory('Photo', function ($resource) {
    return $resource('http://localhost:8000/api/photos/:id.json', { id: '@id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
