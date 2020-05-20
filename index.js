const os = require('os');
const gqlLoader = require('graphql-tag/loader');
const { print, stripIgnoredCharacters } = require('graphql');
const safeEval = require('eval');

/**
 * Transforms a GQL source file to stringified queries file.
 * @param {string} src
 */
function GraphQLTagPrintedLoader(src) {
  const oldSource = gqlLoader.call(this, src);
  const doc = safeEval(oldSource);

  let newSource = '';
  for (const op of doc.definitions) {
    if (op.kind !== 'OperationDefinition') {
      continue;
    }

    if (!op.name) {
      continue;
    }

    const opName = op.name.value;
    const opCode = stripIgnoredCharacters(print(doc[opName]));

    newSource += `
      module.exports['${opName}'] = \`${opCode}\`;
    `;
  }

  return newSource + os.EOL;
};

// Makes it work with Jest as well
GraphQLTagPrintedLoader.process = (src) => {
  return GraphQLTagPrintedLoader.call({ cacheable() { } }, src);
};

module.exports = GraphQLTagPrintedLoader;
