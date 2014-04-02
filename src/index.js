var esprimaHarmony = require('esprima');

var recast = require('recast');
var types = recast.types;
var n = recast.types.namedTypes;

function nodeVisitor(node) {
  if ( n.FunctionDeclaration.check(node) ) {
  }
}

function transform(ast) {
  return types.traverse(ast, nodeVisitor);
}

/**
 * @param {string} source
 * @param {Object} recastOptions
 * @return {string}
 */

function compile(source, customOptions) {
  customOptions = customOptions || {};
  var recastOptions = {
    esprima: esprimaHarmony
  };

  for ( var key in Object.keys(customOptions) ) {
    recastOptions[key] = customOptions[key];
  }

  var ast = recast.parse(source, recastOptions);
  return recast.print(transform(ast), recastOptions);
}

module.exports = {
  compile: compile
};
