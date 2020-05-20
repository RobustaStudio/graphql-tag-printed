module.exports = {
  rootDir: __dirname,
  testMatch: ['<rootDir>/tests/**/*spec.[jt]s?(x)'],
  transform: {
    '\\.(gql|graphql)$': __dirname + '/index.js',
  },
};
