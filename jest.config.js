// jest.config.js
const nextJest = require("next/jest");

// @ts-ignore
const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	// if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
	moduleDirectories: ["node_modules", "<rootDir>/"],
	testEnvironment: "jest-environment-jsdom",
	moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
	collectCoverageFrom: [
		"**/*.{js,jsx,ts,tsx}",
		"!**/node_modules/**",
		"!**/tests/**",
		"!**/coverage/**",
		"!**/@types/**",
		"!**/constants/**",
		"!**/hooks/**",
		"!**/..next/**",
		"!jest.config.js",
		"!next-env.d.ts",
		"!jest.setup.js",
		"!next.config.js",
		"!postcss.config.js",
	],
	coverageReporters: ["html", "text"],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	testPathIgnorePatterns: ["/.next/", "/node_modules/", "/tests/", "/coverage/"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
