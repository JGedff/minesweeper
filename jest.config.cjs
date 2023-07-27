module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|m?j)sx?$': '@swc/jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.yarn/'],
  moduleFileExtensions: ['js', 'mjs', 'jsx'],
  moduleNameMapper: {
    uuid: require.resolve('uuid'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/src/__tests__/mocks/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy' // You have to add all files types of the resources that you use like png...
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    'src/__tests__/',
    'node_modules/',
    '.yarn/'
  ]
}
