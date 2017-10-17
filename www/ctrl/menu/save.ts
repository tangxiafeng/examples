/**
 * Created by tangxiafeng on 2017/6/10.
 */

'use strict';
declare var swal;
export default function SaveController($scope, MenuService, $location, $routeParams) {

    let {id} = $routeParams;
    if (id) {
        $scope.menu = MenuService.get({id: id});
    } else {
        $scope.menu = {orders: 99}
    }

    $scope.items = [
        {name: "顶部菜单", value: 1},
        {name: "底部菜单", value: 2}
    ]
    $scope.saveMenu = function() {
        var type = $scope.menu.type;
        if (type.value) {
            $scope.menu.type = type.value;
        }
        MenuService.save($scope.menu, function(menu) {
            swal("保存成功");
            $location.path('/menu/save').search({id: menu.id});
        })
    }
}