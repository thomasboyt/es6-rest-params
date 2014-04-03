/* jshint evil: true */

var fs = require('fs');
var expect = require('chai').expect;

var compile = require('../src/index').compile;

var compileFixture = function(name) {
  var src = fs.readFileSync(__dirname + '/fixtures/' + name + '.js');
  return compile(src);
};

var assertFixture = function(name) {
  var out = compileFixture(name);
  eval(out.code);
};

describe('rest params', function() {
  it('compile correctly for fn expressions', function() {
    assertFixture('rest');
  });
  it('compile correctly for fn declarations', function() {
    assertFixture('declaration');
  });
  it('compile correctly for arrow fn expression', function() {
    var out = compileFixture('arrow-fn');
    var arrowFnCompiled = require('es6-arrow-function').compile(out.code);
    eval(arrowFnCompiled.code);
  });
});
