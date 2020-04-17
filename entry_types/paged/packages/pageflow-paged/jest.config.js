const {moduleNameMapper, transform} = require('pageflow/config/jest')

module.exports = {
  // Required to make eslint-import-resolver-jest work with absolute
  // paths in moduleNameMapper:
  // https://github.com/JoinColony/eslint-import-resolver-jest/issues/55
  rootDir: require('path').resolve(__dirname),
  globals: {
    pageflow: {},
  },
  setupFiles: ["<rootDir>/spec/support/videojsStub"],
  setupFilesAfterEnv: ["jest-sinon", "<rootDir>/spec/support/jest/jquery-matchers"],
  testMatch: ["<rootDir>/spec/**/*-spec.js"],
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    "^\\$support(.*)$": "<rootDir>/spec/support$1",
    "^\\pageflow-paged/(.*)$": "<rootDir>/src/$1",
    ...moduleNameMapper
  },
  transform
};
