// Generated by CoffeeScript 1.7.1
(function() {
  var unleashedJob;

  unleashedJob = angular.module('unleashedJob', ['ngRoute', 'unleashedCtrls', 'unleashedSrvs', 'googlechart']);

  unleashedJob.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when("/owner/:username", {
        templateUrl: 'repo-list.html',
        controller: 'RepoListCtrl'
      }).when("/owner/:username/repo/:reponame", {
        templateUrl: 'templates/repo-detail.html',
        controller: 'RepoDetailCtrl'
      }).otherwise({
        redirectTo: ''
      });
    }
  ]);

  unleashedJob.value('googleChartApiConfig', {
    version: '1',
    optionalSettings: {
      packages: ['corechart'],
      language: 'en'
    }
  });

}).call(this);
