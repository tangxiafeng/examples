/**
 * Created by tangxiafeng on 2017/6/4.
 */

'use strict';

angular.module("fwdlibs")
    .directive('paginate', function() {
        return {
            restrict: 'AE',
            template: require("./paginate.html"),
            scope: {
                pager:'='
            },
            controller: function($scope, $location) {
                $scope.pageSizes = [10, 20, 50, 100];
                if ($scope.pager.$promise) {
                    $scope.pager.$promise.then( ()=> {
                        //把当前分页条数加进去
                        if($scope.pageSizes.indexOf($scope.pager.pageSize) < 0) {
                            $scope.pageSizes.push($scope.pager.pageSize);
                        }
                    })
                    $scope.$watch("pager.pageSize", function(newVal, oldVal) {
                        if (!newVal || !oldVal) {
                            return;
                        }
                        if (newVal != oldVal) {
                            $location.search('pz', newVal);
                        }
                    })
                }

            }
        }
    })