/**
 * Created by tangxiafeng on 2017/6/4.
 */

'use strict';

declare var KindEditor;
require("kindeditor/themes/default/default.css");
require("kindeditor/themes/simple/simple.css");
declare var $;
angular.module("fwdlibs")
    .directive('kindeditor', function($timeout) {
        return {
            restrict: 'A',
            require: "ngModel",
            scope: {
                val: '<ngModel',
            },
            link($scope, $element, $attr, ngModel) {
                let {id} = $attr;
                var editor;
                KindEditor.ready(function(K) {
                    editor = K.create('#'+id, {
                        width: '100%',
                        height: '150px',
                        afterChange: function() {
                            if (!editor) return;
                            editor.sync();
                            $timeout(() => {
                                ngModel.$setViewValue(editor.html());
                            });
                        }
                    });
                    editor.html($scope.val);
                });
            },
        }
})