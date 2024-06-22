// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
    ...defaultConfig,
    resolver: {
        ...defaultConfig.resolver,
        sourceExts: [...defaultConfig.resolver.sourceExts, "tsx"],
        assetExts: [
            ...defaultConfig.resolver.assetExts,
            "png",
            "jpg",
            "jpeg",
            "gif",
            "webp",
            "svg",
            "ttf",
            "otf",
            "woff",
            "woff2",
        ],
    },
    transformer: {
        ...defaultConfig.transformer,
        assetPlugins: ["expo-asset/tools/hashAssetFiles"],
        minifierConfig: {
            keep_classnames: false,
            keep_fnames: false,
            compress: {
                drop_console: true,
                unsafe: true,
                unsafe_arrows: true,
                unsafe_comps: true,
                unsafe_Function: true,
                unsafe_math: true,
                unsafe_symbols: true,
                unsafe_methods: true,
                unsafe_proto: true,
                unsafe_regexp: true,
                unsafe_undefined: true,
                unused: true,
            },
        },
    },
};

module.exports = config;
