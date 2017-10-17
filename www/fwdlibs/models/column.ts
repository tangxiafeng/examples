/**
 * Created by tangxiafeng on 2017/6/3.
 */

'use strict';

declare var angular;

var fwdlibs = angular.module('fwdlibs');

fwdlibs.factory('ColumnService', function($resource) {
    return $resource('/admin/column/:id', {id:'@id'}, {
        pager: {
            method: 'GET',
            params: {
                p: 1,
                pz: 20
            }
        }
    });
});