declare var angular;

var fwdlibs = angular.module('fwdlibs');

fwdlibs.factory('MenuService', function($resource) {
    return $resource('/admin/menu/:id', {id:'@id'}, {
        pager: {
            method: 'GET',
            params: {
                p: 1,
                pz: 20
            }
        }
    });
});