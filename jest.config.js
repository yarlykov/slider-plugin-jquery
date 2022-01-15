module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverageFrom: [
    '<rootDir>/source/**/{!(Presenter|interfaces|DemoBlock|index|app|events),}.ts',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/test/jest/__mocks__/styleMock.ts',
    '^Root/(.*)$': '<rootDir>/$1',
    '^Source/(.*)$': '<rootDir>/source/$1',
    '^Components/(.*)$': '<rootDir>/source/components/$1'
  },
};
