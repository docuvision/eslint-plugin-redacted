module.exports = {
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      Decorator(node) {
        const { name } = node.expression;

        if (name === 'action' && node.parent.type === 'MethodDefinition') {
          const actionDecoratorTokens = sourceCode.getTokens(node);
          const methodToken = sourceCode.getTokenAfter(node);

          const actionDecoratorStartLine = actionDecoratorTokens[1].loc.start.line;
          const methodStartLine = methodToken.loc.start.line;

          if (actionDecoratorStartLine === methodStartLine) {
            context.report({
              node,
              message: `The @action
decorator and ${methodToken.value} method are on the same line.`,
            });
          }
        }
      },
    };
  },
};
