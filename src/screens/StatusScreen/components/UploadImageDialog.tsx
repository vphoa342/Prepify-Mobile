import * as ImagePicker from "expo-image-picker";
import { TrashIcon } from "lucide-react-native";
import React from "react";
import {
    Image,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { Button, Dialog, Paragraph } from "react-native-paper";
import { StatusScreenContext } from "../context/StatusScreenContext";
import { StatusScreenActionType } from "../context/status-context.type";
import { compressImage } from "$utils/image";

const UploadImageDialog = () => {
    const deviceWidth = useWindowDimensions().width;
    const { isUploadImageDialogVisible, images, dispatch } =
        React.useContext(StatusScreenContext);

    const pickImage = async () => {
        if (images!.length >= 3) {
            alert("You can only upload a maximum of 3 images");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const compressedImages = await Promise.all(
                result.assets.map(
                    async (asset) => await compressImage(asset.uri)
                )
            );
            // dispatch({
            //     type: StatusScreenActionType.SET_IMAGES,
            //     payload: {
            //         images: [
            //             ...images!,
            //             ...result.assets.map((asset) => asset.uri),
            //         ],
            //     },
            // });
            dispatch({
                type: StatusScreenActionType.SET_IMAGES,
                payload: {
                    images: [...images!, ...compressedImages],
                },
            });
        }
    };

    const takePhoto = async () => {
        if (images!.length >= 3) {
            alert("You can only upload a maximum of 3 images");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 1,
        });

        if (!result.canceled) {
            const compressedImages = await Promise.all(
                result.assets.map(
                    async (asset) => await compressImage(asset.uri)
                )
            );
            dispatch({
                type: StatusScreenActionType.SET_IMAGES,
                payload: {
                    images: [...images!, ...compressedImages],
                },
            });
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images!];
        newImages.splice(index, 1);

        dispatch({
            type: StatusScreenActionType.SET_IMAGES,
            payload: {
                images: [...newImages],
            },
        });
    };

    const hideDialog = () => {
        dispatch({
            type: StatusScreenActionType.HIDE_UPLOAD_IMAGE_DIALOG,
            payload: {},
        });
    };

    const showDeliveredDialog = () => {
        dispatch({
            type: StatusScreenActionType.SHOW_DELIVERED_DIALOG,
            payload: {},
        });
    };

    return (
        <Dialog
            visible={isUploadImageDialogVisible!}
            onDismiss={() => {
                showDeliveredDialog();
                hideDialog();
            }}
            style={{ width: deviceWidth * 0.95, alignSelf: "center" }}
        >
            <Dialog.Title>Đăng ảnh</Dialog.Title>
            <Dialog.Content>
                <Paragraph>Bạn được đăng tối đa 3 ảnh</Paragraph>
                <Button onPress={pickImage}>Chọn ảnh từ máy</Button>
                <Button onPress={takePhoto}>Chụp ảnh</Button>
                <View className="flex flex-row flex-wrap mt-2">
                    {images!.map((imageUri, index) => (
                        <View key={index} className="relative m-1">
                            <Image
                                source={{ uri: imageUri }}
                                className="w-24 h-24 rounded-lg"
                            />
                            <TouchableOpacity
                                onPress={() => removeImage(index)}
                                className="absolute top-0 right-0 bg-red-600 p-1 rounded-full"
                            >
                                <TrashIcon size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </Dialog.Content>
            <Dialog.Actions>
                <Button
                    onPress={() => {
                        showDeliveredDialog();
                        hideDialog();
                    }}
                >
                    Xác nhận
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default UploadImageDialog;
