const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  transform: {
    '^.+\\.(t|j)s?$': ['@swc/jest'],
  },
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    '^@app/infrastructure$': 'libs/infrastructure/src',
    '^@app/infrastructure/(.*)$': 'libs/infrastructure/src/$1',
    '^@app/core$': 'libs/core/src',
    '^@app/core/(.*)$': 'libs/core/src/$1',
  },
}
