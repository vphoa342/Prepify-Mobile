import StyledButton from "$components/ui/StyledButton";
import React from "react";
import { View, useWindowDimensions } from "react-native";
import {
    Button,
    Card,
    Dialog,
    Portal,
    Text,
    useTheme,
} from "react-native-paper";
import { StatusScreenContext } from "../context/StatusScreenContext";
import { StatusScreenActionType } from "../context/status-context.type";
import DialogItem from "./DialogItem";
import { ChevronRightIcon, PhoneForwardedIcon } from "lucide-react-native";

const CanceledDialog = () => {
    const deviceWidth = useWindowDimensions().width;
    const theme = useTheme();
    const { isCanceledDialogVisible, dispatch } =
        React.useContext(StatusScreenContext);

    const hideDialog = () => {
        dispatch({
            type: StatusScreenActionType.HIDE_CANCELED_DIALOG,
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
            visible={isCanceledDialogVisible!}
            onDismiss={() => {
                hideDialog();
                showReportDialog();
            }}
            style={{ width: deviceWidth * 0.9, alignSelf: "center" }}
        >
            <Dialog.Title>Hủy đơn hàng</Dialog.Title>
            <Dialog.Content>
                <View>
                    <Text className="font-bold">
                        Để được thao tác Delay bạn cần:
                    </Text>
                    <Text> - Gọi thành công đến khách hàng</Text>
                    <Text> - Không liên lạc được: Gọi đủ 3 lần</Text>
                </View>
                <DialogItem />
                <View className="flex flex-row justify-between mt-4">
                    <View className="flex flex-row">
                        <PhoneForwardedIcon color={theme.colors.primary} />
                        <Text className="ml-2" variant="bodyLarge">
                            Liên hệ khách hàng
                        </Text>
                    </View>
                    <ChevronRightIcon color={theme.colors.primary} />
                </View>
            </Dialog.Content>
            <Dialog.Actions>
                <StyledButton
                    onPress={() => {
                        hideDialog();
                        showReportDialog();
                    }}
                >
                    Đóng
                </StyledButton>
                <StyledButton mode="contained-tonal">Xác nhận</StyledButton>
            </Dialog.Actions>
        </Dialog>
    );
};

export default CanceledDialog;
