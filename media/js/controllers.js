// Generated by CoffeeScript 1.7.1
(function() {
  var unleashedCtrls;

  unleashedCtrls = angular.module('unleashedCtrls', []);

  unleashedCtrls.controller('MainCtrl', function($scope, $location, Owner) {
    $scope.owner = Owner;
    return $scope.getRepos = function() {
      if (Owner.mode === 2) {
        return Owner.query();
      } else {
        return $location.path("/owner/" + Owner.username);
      }
    };
  });

  unleashedCtrls.controller('RepoListCtrl', function($scope, $routeParams, Owner) {
    Owner.username = $routeParams.username;
    return Owner.query();
  });

  unleashedCtrls.controller('RepoDetailCtrl', function($scope, $routeParams, Owner, Repo) {
    $scope.repo = Repo;
    Owner.username = $routeParams.username;
    if (!Owner.repos) {
      Owner.query();
    }
    Repo.reponame = $routeParams.reponame;
    Repo.getinfo();
    return Repo.getlangs();
  });

}).call(this);
