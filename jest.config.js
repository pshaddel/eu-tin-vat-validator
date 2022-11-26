module.exports = {
    roots: ['test'],
    transform: {
      '^.+\\.tsx?$': ['@swc/jest']
    },
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js']
  }
