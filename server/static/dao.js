/**
 * Created by tangxiafeng on 2017/9/24.
 */
'use strict';

(function(g) {
    var dao = {};
    var URL = '/admin';
    dao.doDelete = function(module, id, isConfirm, fn){
        if (isConfirm && !confirm('确实要删除吗?')) {
            return;
        }

        $.ajax({
            url: URL + '/' + module + '/' + id,
            method: 'DELETE',
            dataType: "json",
            success: function(data) {
                if (fn && typeof fn == 'function') {
                    return fn(data);
                }
                var $obj = $("#data-"+module+'-'+id)
                if ($obj) {
                    $obj.remove();
                }
            },
            error: function(err) {
                alert("操作失败, 请稍后重试!");
            }
        })
    }
    g.dao = dao;
})(window);