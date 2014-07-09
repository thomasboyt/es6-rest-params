var esprimaHarmony = require('esprima');

var recast = require('recast');
var types = recast.types;
var b = recast.types.builders;

var visitor = types.PathVisitor.fromMethodsObject({
  visitFunction: function(path) {
    this.traverse(path);

    var node = path.value;
    if (!node.rest) {
      return;
    }

    var numArgs = node.params.length;

    path.get("body", "body").unshift(
      // var args = [].call(arguments, 1);
      b.variableDeclaration('var', [
        b.variableDeclarator(
          node.rest,
          b.callExpression(
            b.memberExpression(
              b.memberExpression(
                b.arrayExpression([]),
                b.identifier('slice'),
                false
              ),
              b.identifier('call'),
              false
            ),
            [b.identifier('arguments'), b.literal(numArgs)]
          )
        )
      ])
    );

    node.rest = null;
  }
});

function transform(ast) {
  return recast.visit(ast, visitor);
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

  for ( var key in customOptions ) {
    recastOptions[key] = customOptions[key];
  }

  var ast = recast.parse(source, recastOptions);
  return recast.print(transform(ast), recastOptions);
}

module.exports = {
  compile: compile,
  transform: transform
};
