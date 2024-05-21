const path = require('path');

module.exports = {
  roots: [ path.resolve(__dirname, './') ],
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: ['js', 'json', 'vue'],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
 moduleNameMapper: {
   '^@/(.*)$': '<rootDir>/src/$'
 },
 modulePaths: ["<rootDir>/src/"],
 collectCoverage: true,
};
