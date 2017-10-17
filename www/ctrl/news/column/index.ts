/**
 * Created by tangxiafeng on 2017/5/25.
 */
'use strict';
declare var swal;

export class Column  {

    constructor() {
    }

    list($scope, ColumnService, $routeParams) {
        let {p, pz} = $routeParams;
        let paginate = ColumnService.pager({p: p, pz: pz});
        $scope.paginate = paginate;
    }

    detail($scope, $routeParams, ColumnService) {
        let id = $routeParams.id;
        $scope.column = ColumnService.get({id: id});
    }
    save($scope, $routeParams, ColumnService, $location) {
        let {id, parentId} = $routeParams;
        if (!parentId) {
            parentId = 0;
        }
        if (id) {
            $scope.column = ColumnService.get({id: id});
        } else {
            $scope.column = {parentId: parentId};
        }

        if (parentId) {
            $scope.parentColumn = ColumnService.get({id: parentId});
        } else {
            $scope.parentColumn = {};
        }

        $scope.types = [
            {id: 1, name:'文章'},
            {id: 2, name:'图片'},
            {id: 3, name:'视频'},
            {id: 4, name: '单页'}
        ]

        $scope.save = () => {
            let column = $scope.column;
            ColumnService.save(column, function(column) {
                swal("保存成功")
                $location.path('save').search({id: column.id});
            })
        }
    }
}

let column = new Column();

export default column
