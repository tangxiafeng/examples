/**
 * Created by tangxiafeng on 2017/6/10.
 */

'use strict';

export  default function ListController($scope, MenuService, $routeParams) {
    let {p, pz} = $routeParams
    $scope.pager = MenuService.pager({p, pz});
}