/**
 * Created by tangxiafeng on 2017/1/11.
 */
'use strict';

var jQuery = require("jquery");
window['$'] = window['jQuery'] = jQuery;

require("bootstrap/dist/css/bootstrap.css")
require('bootstrap');
require("sweetalert/dist/sweetalert.css")
require("sweetalert");

var angular = window['angular'] = require('angular');
require("./fwdlibs");
require("ng-resource")(window, angular);
var ngRouter = require('angular-route');

var moduleName = 'fwdcms';
var app = window['app'] = angular.module(moduleName, ['ngResource', ngRouter, 'fwdlibs']);
//加载路由
require('./router')(app);
//启动angular
angular.element(document).ready(function() {
  angular.bootstrap(document, [moduleName]);
});