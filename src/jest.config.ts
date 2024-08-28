import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  moduleNameMapper: {
    '\\.(scss|css)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom', // Вказати jsdom як середовище тестування
  setupFilesAfterEnv: ['./src/setupTests.ts'], // Налаштування тестового середовища
};

export default config;
