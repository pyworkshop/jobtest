#JSONP data service
unleashedSrvs = angular.module 'unleashedSrvs', ['ngResource']

# Github APIs
APIs = 
  owner:
    uri: 'https://api.github.com/users/:owner/repos'
    actions:
      method: 'JSONP'
      params:
        owner: "@owner"
  repo: 
    uri: 'https://api.github.com/repos/:owner/:repo'
    actions:
      method: 'JSONP'
      params:
        owner: "@owner"
        repo: "@repo"
  lang:
    uri: 'https://api.github.com/repos/:owner/:repo/languages'
    actions:
      method: 'JSONP'
      params:
        owner: "@owner"
        repo: "@repo"

# Modes
Modes = 
  empty: 0
  list: 1
  detail: 2

# Owner Service
unleashedSrvs.factory 'Owner', ['$resource', ($resource)->
  owner = 
    username: ""
    mode: 0
    repos: false
    error: {}
    repoProvider: $resource APIs.owner.uri, {callback: "JSON_CALLBACK"}, { query: APIs.owner.actions }
    query: ()->
      owner.mode = Modes.list if owner.mode!=Modes.detail
      owner.repoProvider.query owner:owner.username,(repos)->
        owner.repos = repos.data
      ,(errors)->
        console.error(errors)
  return owner
]

# Repo Service
unleashedSrvs.factory 'Repo', ['$resource', 'Owner', ($resource, Owner)->
  repo = 
    reponame: ""
    info: false
    langs: []
    error: {}
    charts: 
      type: "PieChart"
      options: 
        title: 'How much languages?'
        is3D: true
        sliceVisibilityThreshold: 1/10000
      data:
        cols:[
          {id: "t", label: "Language", type: "string"},
          {id: "s", label: "Lines", type: "number"}
        ]
    infoProvider: $resource APIs.repo.uri, {callback: "JSON_CALLBACK"}, { query: APIs.repo.actions }
    langProvider: $resource APIs.lang.uri, {callback: "JSON_CALLBACK"}, { query: APIs.lang.actions }
    getinfo: ()->
      Owner.mode = Modes.detail
      repo.infoProvider.query owner:Owner.username, repo:repo.reponame, (repos)->
        repo.info = repos.data
      ,(errors)->
        console.error(errors)
    getlangs: ()->
      repo.langProvider.query owner:Owner.username, repo:repo.reponame, (repos)->
        repo.langs = repos.data
        rows = []
        rows.push({c:[{v:lang},{v:lines}]}) for lang,lines of repo.langs
        repo.charts.data["rows"] = rows
      ,(errors)->
        console.error(errors)
  return repo
]
