/**
 * Created by tangxiafeng on 2016/11/6.
 */

'use strict';

export function isPromise(fn) {
    return !!(fn && fn.then && typeof fn.then === 'function');
}