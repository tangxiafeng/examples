/**
 * Created by tangxiafeng on 2016/11/29.
 */
'use strict';

require('ts-node').register(require('../tsconfig.json'));

var fs = require('fs');
var path = require('path');

//加载测试文件
function loadTest(dir) {

  let files = fs.readdirSync(dir);

  for(var f of files) {
    let stats = fs.statSync(path.join(dir, f));
    if (stats.isDirectory()) {
      loadTest(path.join(dir, f));
    }

    if (!/\w+\.test\.ts/.test(f)) {
      continue;
    }
    f = f.replace(/\.ts$/, '');
    let file = dir + '/' + f
    require(file);
  }
}

loadTest(__dirname);