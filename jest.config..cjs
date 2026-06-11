module.exports = {
  // Matches .test.js files inside both 'test' and 'unit-testing' folders
  testMatch: [
    '**/test/**/*.test.js',
    '**/unit-testing/**/*.test.js'
  ],
  
  testPathIgnorePatterns: [
    '/node_modules/',
    '/playwright/',
    'longer-example.spec.js'
  ],

  modulePathIgnorePatterns: [
    '<rootDir>/cdk.out/'
  ]
};
