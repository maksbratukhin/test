const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)+(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageReporters: ['html'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
