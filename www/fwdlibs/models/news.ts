declare var angular;

var fwdlibs = angular.module('fwdlibs');

fwdlibs.factory('NewsService', function($resource) {
    return $resource('/admin/news/:id', {id:'@id'}, {
        pager: {
            method: 'GET',
            params: {
                p: 1,
                pz: 20
            }
        }
    });
});