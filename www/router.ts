/**
 * Created by tangxiafeng on 2017/1/12.
 */
'use strict';

import RouterHelper = require("./router-helper");

import ctrls from './ctrl';
let modules = ctrls;

function initRouter(app) {
    app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when(':path*', {
            controller: function($routeParams, $injector, $scope) {
              var url = $routeParams.path;
              if (!url) {
                url = '/';
              }
              var routerHelper = new RouterHelper(url);
              let _modules = routerHelper.getModules();
              let func = routerHelper.getFunc();
              var m;
              _modules.forEach((module) => {
                  if (!m) {
                      m = modules[module];
                  } else {
                      m = m[module];
                  }
              });
              if (!m) {
                  throw new Error(`module ${m} not exist!`);
              }
              let c = m[func];
              if (!c) {
                  console.warn(`module ${module} not has func ${func}`);
                  c = EmptyController;
              }
              return $injector.invoke(c, this, {$scope: $scope});
          },
            templateUrl: function($routeParams) {
                let url = $routeParams.path;
                var routerHelper = new RouterHelper(url);
                return '/ctrl/'+routerHelper.getModules().join('/')+'/' + routerHelper.getFunc() + '.html';
            }
        })
        .otherwise({
          redirectTo: "/index/index"
        })
  });
}

function EmptyController() {
}

module.exports = initRouter;