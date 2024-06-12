import StyledButton from "$components/ui/StyledButton";
import { StatusScreenContext } from "$screens/StatusScreen/context/StatusScreenContext";
import {
    ChevronRightIcon,
    CircleCheckBigIcon,
    CircleXIcon,
    TimerResetIcon,
} from "lucide-react-native";
import * as React from "react";
import { Pressable, View, useWindowDimensions } from "react-native";
import { Dialog, Text, useTheme } from "react-native-paper";
import { StatusScreenActionType } from "../context/status-context.type";

const ReportDialog = () => {
    const deviceWidth = useWindowDimensions().width;
    const { isReportDialogVisible, dispatch } =
        React.useContext(StatusScreenContext);
    const theme = useTheme();

    const hideDialog = () => {
        dispatch({
            type: StatusScreenActionType.HIDE_REPORT_DIALOG,
            payload: {},
        });
    };

    const showDeliveredDialog = () => {
        dispatch({
            type: StatusScreenActionType.SHOW_DELIVERED_DIALOG,
            payload: {},
        });
    };

    const showDelayedDialog = () => {
        dispatch({
            type: StatusScreenActionType.SHOW_DELAYED_DIALOG,
            payload: {},
        });
    };

    const showCanceledDialog = () => {
        dispatch({
            type: StatusScreenActionType.SHOW_CANCELED_DIALOG,
            payload: {},
        });
    };

    return (
        <Dialog
            visible={isReportDialogVisible!}
            onDismiss={hideDialog}
            style={{ width: deviceWidth * 0.8, alignSelf: "center" }}
        >
            <Dialog.Title>Báo cáo</Dialog.Title>
            <Dialog.Content>
                <Pressable
                    onPress={() => {
                        showDeliveredDialog();
                        hideDialog();
                    }}
                >
                    <View className="flex flex-row justify-between">
                        <View className="flex flex-row">
                            <CircleCheckBigIcon color={theme.colors.primary} />
                            <Text className="ml-2" variant="bodyMedium">
                                Đã giao hàng
                            </Text>
                        </View>
                        <ChevronRightIcon color={theme.colors.primary} />
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => {
                        showDelayedDialog();
                        hideDialog();
                    }}
                >
                    <View className="flex flex-row mt-2 justify-between">
                        <View className="flex flex-row">
                            <TimerResetIcon color={theme.colors.primary} />
                            <Text className="ml-2" variant="bodyMedium">
                                Delay đơn hàng
                            </Text>
                        </View>
                        <ChevronRightIcon color={theme.colors.primary} />
                    </View>
                </Pressable>

                <Pressable
                    onPress={() => {
                        showCanceledDialog();
                        hideDialog();
                    }}
                >
                    <View className="flex flex-row mt-2 justify-between">
                        <View className="flex flex-row">
                            <CircleXIcon color={theme.colors.primary} />
                            <Text className="ml-2" variant="bodyMedium">
                                Hủy đơn hàng
                            </Text>
                        </View>
                        <ChevronRightIcon color={theme.colors.primary} />
                    </View>
                </Pressable>
            </Dialog.Content>
            <Dialog.Actions>
                <StyledButton onPress={hideDialog}>Đóng</StyledButton>
            </Dialog.Actions>
        </Dialog>
    );
};

export default ReportDialog;
