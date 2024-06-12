import StyledButton from "$components/ui/StyledButton";
import {
    CameraIcon,
    ChevronRightIcon,
    CircleCheckBigIcon,
} from "lucide-react-native";
import React from "react";
import { View, useWindowDimensions } from "react-native";
import { Dialog, Text, useTheme } from "react-native-paper";
import { StatusScreenContext } from "../context/StatusScreenContext";
import { StatusScreenActionType } from "../context/status-context.type";
import DialogItem from "./DialogItem";

const DeliveredDialog = () => {
    const theme = useTheme();
    const deviceWidth = useWindowDimensions().width;
    const { isDeliveredDialogVisible, dispatch } =
        React.useContext(StatusScreenContext);

    const hideDialog = () => {
        dispatch({
            type: StatusScreenActionType.HIDE_DELIVERED_DIALOG,
            payload: {},
        });
    };

    const showReportDialog = () => {
        dispatch({
            type: StatusScreenActionType.SHOW_REPORT_DIALOG,
            payload: {},
        });
    };

    return (
        <Dialog
            visible={isDeliveredDialogVisible!}
            onDismiss={() => {
                showReportDialog();
                hideDialog();
            }}
            style={{ width: deviceWidth * 0.9, alignSelf: "center" }}
        >
            <Dialog.Title>Xác nhận giao hàng</Dialog.Title>
            <Dialog.Content>
                <View>
                    <Text className="font-bold">
                        Lưu ý về ảnh chụp đúng: 1 trong 3 cách dưới đây
                    </Text>
                    <Text> 1. Chụp Selfie cùng người nhận hàng</Text>
                    <Text> 2. Chụp ảnh trao tay có chữ ký trên gói hàng</Text>
                    <Text> 3. Chụp ảnh người nhận cùng gói hàng</Text>
                </View>
                <DialogItem />
                <View className="flex flex-row justify-between mt-4">
                    <View className="flex flex-row">
                        <CameraIcon color={theme.colors.primary} />
                        <Text className="ml-2" variant="bodyLarge">
                            B1: Chụp ảnh
                        </Text>
                    </View>
                    <View className="flex flex-row underline">
                        <Text>Xem ảnh (1)</Text>
                        <ChevronRightIcon color={theme.colors.primary} />
                    </View>
                </View>
                <View className="flex flex-row justify-between mt-4">
                    <View className="flex flex-row">
                        <CircleCheckBigIcon color={theme.colors.primary} />
                        <Text className="ml-2" variant="bodyLarge">
                            B2: Xác nhận đã giao hàng
                        </Text>
                    </View>
                    <ChevronRightIcon color={theme.colors.primary} />
                </View>
            </Dialog.Content>
            <Dialog.Actions>
                <StyledButton
                    onPress={() => {
                        showReportDialog();
                        hideDialog();
                    }}
                >
                    Đóng
                </StyledButton>
            </Dialog.Actions>
        </Dialog>
    );
};

export default DeliveredDialog;
