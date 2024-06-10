module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module:react-native-dotenv",
                {
                    envName: "APP_ENV",
                    moduleName: "@env",
                    path: ".env",
                    blocklist: null,
                    allowlist: null,
                    blacklist: null, // DEPRECATED
                    whitelist: null, // DEPRECATED
                    safe: false,
                    allowUndefined: true,
                    verbose: false,
                },
            ],
            "nativewind/babel",
            [
                "module-resolver",
                {
                    alias: {
                        "@configs": "./src/configs",
                        "@components": "./src/components",
                        "@hooks": "./src/hooks",
                        "@services": "./src/services",
                        "@apis": "./src/apis",
                    },
                },
            ],
            "react-native-reanimated/plugin",
        ],
    };
};
