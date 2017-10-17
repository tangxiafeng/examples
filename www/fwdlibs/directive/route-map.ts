/**
 * Created by tangxiafeng on 2017/6/4.
 */

'use strict';

angular.module("fwdlibs")
.directive('routeMap', ()=> {
    return {
        restrict: 'AE',
        scope: {
            routes: '='
        },
        template: require("./route-map.html"),
        controller: ($scope) => {
            let routes = $scope.routes;
            if (!routes || !routes.length) {
                routes = [
                    {url: '#!/index/index', name: '首页'}
                ]
            }
            $scope.routes = routes;
        }
    }
})