module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?@?react-native|expo|@expo|@react-navigation)',
    ],
    testMatch: ['**/__tests__/**/*.test.ts?(x)'],
};