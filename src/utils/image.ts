import { Image } from "react-native-compressor";

export const compressImage = async (uri: string) => {
    const result = await Image.compress(uri, {
        progressDivider: 10,
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 600,
        compressionMethod: "auto",
    });

    return result;
};
