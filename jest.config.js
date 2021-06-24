module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverageFrom: [
    '<rootDir>/source/**/{!(Presenter|interfaces),}.ts',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/test/jest/__mocks__/styleMock.ts',
  },
};
