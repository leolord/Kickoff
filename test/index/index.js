'use strict';

describe('index module test', function(){
  var root = window || global;
  var expect = root.expect;

  require('../../app/index/index');

  it('index js test', function(){
    expect(1).toBe(1);
  });
});
