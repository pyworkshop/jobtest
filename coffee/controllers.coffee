unleashedCtrls = angular.module 'unleashedCtrls', []

unleashedCtrls.controller 'MainCtrl', ($scope, $location, Owner)->
  $scope.owner = Owner
  $scope.getRepos = ->
    if Owner.mode==2 
      Owner.query() 
    else 
      $location.path "/owner/#{Owner.username}" 
      
unleashedCtrls.controller 'RepoListCtrl', ($scope, $routeParams, Owner)->
  Owner.username = $routeParams.username
  Owner.query()

unleashedCtrls.controller 'RepoDetailCtrl', ($scope, $routeParams, Owner, Repo)->
  $scope.repo = Repo
  Owner.username = $routeParams.username
  Owner.query() if !Owner.repos
  Repo.reponame = $routeParams.reponame
  Repo.getinfo()
  Repo.getlangs()
