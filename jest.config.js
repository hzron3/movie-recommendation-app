module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
    "^utils/(.*)$": "<rootDir>/utils/$1",
    "^Auth$": "<rootDir>/Auth.js",
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
