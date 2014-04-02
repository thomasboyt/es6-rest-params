/* jshint evil: true */

var fs = require('fs');
var expect = require('chai').expect;

var compile = require('../src/index').compile;

var compileFixture = function(name) {
  var src = fs.readFileSync(__dirname + '/fixtures/' + name + '.js');
  return compile(src);
};

describe('rest params', function() {
  it('compile to an array', function() {
    var out = compileFixture('rest');
    eval(out.code);
  });
});
