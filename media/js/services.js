// Generated by CoffeeScript 1.7.1
(function() {
  var APIs, Modes, unleashedSrvs;

  unleashedSrvs = angular.module('unleashedSrvs', ['ngResource']);

  APIs = {
    owner: {
      uri: 'https://api.github.com/users/:owner/repos',
      actions: {
        method: 'JSONP',
        params: {
          owner: "@owner"
        }
      }
    },
    repo: {
      uri: 'https://api.github.com/repos/:owner/:repo',
      actions: {
        method: 'JSONP',
        params: {
          owner: "@owner",
          repo: "@repo"
        }
      }
    },
    lang: {
      uri: 'https://api.github.com/repos/:owner/:repo/languages',
      actions: {
        method: 'JSONP',
        params: {
          owner: "@owner",
          repo: "@repo"
        }
      }
    }
  };

  Modes = {
    empty: 0,
    list: 1,
    detail: 2
  };

  unleashedSrvs.factory('Owner', [
    '$resource', function($resource) {
      var owner;
      owner = {
        username: "",
        mode: 0,
        repos: false,
        error: {},
        repoProvider: $resource(APIs.owner.uri, {
          callback: "JSON_CALLBACK"
        }, {
          query: APIs.owner.actions
        }),
        query: function() {
          if (owner.mode !== Modes.detail) {
            owner.mode = Modes.list;
          }
          return owner.repoProvider.query({
            owner: owner.username
          }, function(repos) {
            return owner.repos = repos.data;
          }, function(errors) {
            return console.error(errors);
          });
        }
      };
      return owner;
    }
  ]);

  unleashedSrvs.factory('Repo', [
    '$resource', 'Owner', function($resource, Owner) {
      var repo;
      repo = {
        reponame: "",
        info: false,
        langs: [],
        error: {},
        charts: {
          type: "PieChart",
          options: {
            title: 'How much languages?',
            is3D: true,
            sliceVisibilityThreshold: 1 / 10000
          },
          data: {
            cols: [
              {
                id: "t",
                label: "Language",
                type: "string"
              }, {
                id: "s",
                label: "Lines",
                type: "number"
              }
            ]
          }
        },
        infoProvider: $resource(APIs.repo.uri, {
          callback: "JSON_CALLBACK"
        }, {
          query: APIs.repo.actions
        }),
        langProvider: $resource(APIs.lang.uri, {
          callback: "JSON_CALLBACK"
        }, {
          query: APIs.lang.actions
        }),
        getinfo: function() {
          Owner.mode = Modes.detail;
          return repo.infoProvider.query({
            owner: Owner.username,
            repo: repo.reponame
          }, function(repos) {
            return repo.info = repos.data;
          }, function(errors) {
            return console.error(errors);
          });
        },
        getlangs: function() {
          return repo.langProvider.query({
            owner: Owner.username,
            repo: repo.reponame
          }, function(repos) {
            var lang, lines, rows, _ref;
            repo.langs = repos.data;
            rows = [];
            _ref = repo.langs;
            for (lang in _ref) {
              lines = _ref[lang];
              rows.push({
                c: [
                  {
                    v: lang
                  }, {
                    v: lines
                  }
                ]
              });
            }
            return repo.charts.data["rows"] = rows;
          }, function(errors) {
            return console.error(errors);
          });
        }
      };
      return repo;
    }
  ]);

}).call(this);
