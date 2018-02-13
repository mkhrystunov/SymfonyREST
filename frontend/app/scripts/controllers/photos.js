'use strict';

/**
 * @ngdoc function
 * @name restGalleryApp.controller
 * @description
 * # Photo controllers
 * Controllers of the restGalleryApp
 */
angular.module('restGalleryApp')
  .service('Pagination', function () {
    return {
      currentPage: 1,
      perPage: 2
    };
  })
  .controller('PhotosCtrl', function ($scope, Photo, config, Pagination) {
    $scope.backend_url = config.backendUrl;

    var loadPhotos = function () {
      Photo.query(function (data) {
        $scope.photos = data;
      });
    };

    $scope.deletePhoto = function (photo) {
      photo.$delete(function () {
        loadPhotos();
      })
    };

    loadPhotos();

    $scope.pagination = Pagination;
  })
  .filter('searchFilter', function () {
    return function (input, query) {
      var inputArray = [];
      angular.forEach(input, function (el) {
        inputArray.push(el);
      });
      if (query) {
        inputArray = inputArray.filter(function (photo) {
          for (var i = 0, len = photo.tags.length; i < len; i++) {
            if (photo.tags[i].match(query)) {
              return true
            }
          }
          return false;
        });
      }
      return inputArray;
    }
  })
  .filter('filterPagination', function (Pagination) {
    return function (input) {
      var inputArray = [];
      var start = (Pagination.currentPage - 1) * Pagination.perPage;
      var end = Pagination.currentPage * Pagination.perPage;
      for (var prop in input) {
        if (input.hasOwnProperty(prop)) {
          inputArray.push(input[prop]);
        }
      }
      return inputArray.slice(start, end);
    }
  })
  .filter('length', function () {
    return function (input) {
      return input.length;
    };
  })
  .controller('PhotosEditCtrl', function ($scope, Photo, $location, config, $http, $routeParams) {
    $scope.backend_url = config.backendUrl;
    if ($routeParams.id) {
      $scope.mode = 'edit';
      $scope.loadPhoto = function () { //Issues a GET request to /api/movies/:id to get a movie to update
        Photo.get({id: $routeParams.id}, function (data) {
          $scope.photo = data;
          $scope.tags = $scope.photo.tags;
        });
      };
      $scope.loadPhoto();
    } else {
      $scope.mode = 'create';
      $scope.photo = new Photo();
      $scope.tags = [];
    }

    $scope.addTag = function () {
      $scope.tags.push('');
    };
    $scope.removeTag = function ($index) {
      $scope.tags.splice($index, 1);
    };
    $scope.savePhoto = function () {
      if ($scope.mode === 'create') {
        var fd = new FormData();
        fd.append('file', $scope.photo.file);
        angular.forEach($scope.photo.tags, function (tag) {
          fd.append('tags[]', tag);
        });
        // TODO handle error
        $http.post('http://localhost:8000/api/photos', fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).then(function () {
          $location.path('/');
        });
      } else if ($scope.mode === 'edit') {
        delete $scope.photo.web_path;
        $scope.photo.$update(function () {
          $location.path('/');
        });
      }
    };
  });
