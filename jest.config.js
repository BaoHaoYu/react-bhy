module.exports = {
    "verbose": true,
    "collectCoverage": true,
    "testEnvironment": "node",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js"
    ],
    "moduleNameMapper": {
        "\\.(css|less|scss|sss|styl)$": "identity-obj-proxy"
    },
    "transform": {
        "^.+\\.js$": "babel-jest",
        "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
    },
    "testRegex": "/stories/*/.*\\.test\\.(ts|tsx|js)$",
    "transformIgnorePatterns": [
        "/node_modules/(?!odash-es).+\\.js$"
    ]
}