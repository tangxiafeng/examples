/**
 * Created by tangxiafeng on 2017/5/21.
 */
'use strict';

function RouterHelper(url) {
    if (!/^\//.test(url)) {
        url = '/'+ url;
    }
    this.url = url;
}

RouterHelper.prototype.getModules = function()  {
    var defaultModule = 'index';
    let url = this.url;
    let modules = [];
    if (url) {
        let urls = url.split(/\//);
        for(var i=0, ii = urls.length; i<ii; i++) {
            if (!urls[i]) continue;
            if (i < ii -1) {
                modules.push(urls[i]);
            }
        }
        return modules && modules.length ? modules: [defaultModule];
    }
    return [defaultModule];
}

RouterHelper.prototype.getFunc= function() {
    var defaultFunc = 'index';
    let url = this.url;
    if (url) {
        let urls = url.split(/\//);
        var func = urls[urls.length-1];
        return func ? func : defaultFunc;
    }
    return defaultFunc;
}

export= RouterHelper;