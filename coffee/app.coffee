# Unleashed Job Test App Module
unleashedJob = angular.module 'unleashedJob', ['ngRoute', 'unleashedCtrls', 'unleashedSrvs', 'googlechart']

# Routers configration
unleashedJob.config ['$routeProvider', ($routeProvider)->
  $routeProvider.when "/owner/:username", 
    templateUrl: 'repo-list.html',
    controller:   'RepoListCtrl'
  .when "/owner/:username/repo/:reponame", 
    templateUrl: 'templates/repo-detail.html',
    controller:   'RepoDetailCtrl'    
  .otherwise 
    redirectTo:  ''
  ]

unleashedJob.value 'googleChartApiConfig', 
  version: '1'
  optionalSettings:
    packages: ['corechart']
    language: 'en'
