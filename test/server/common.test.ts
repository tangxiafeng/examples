/**
 * Created by tangxiafeng on 2016/11/29.
 */
'use strict';

let common = require('../../server/common');
let assert = require('assert');

describe('server/common.ts', function() {
  it('#isPromise should be ok with promise fn', function(done) {
    let p = new Promise((resolve, reject) => {
      resolve(true);
    });
    let ret = common.isPromise(p);
    assert.equal(ret, true);
    done();
  })

  it("#isPromise should be ok with fn is undefined", function(done) {
    let p = undefined;
    let ret = common.isPromise(p);
    assert.equal(ret, false);
    done();
  })

  it("#isPromise should be ok with fn is not promise", function(done) {

    let p = function() {}
    let ret = common.isPromise(p);
    assert.equal(ret, false);
    done();
  })
});