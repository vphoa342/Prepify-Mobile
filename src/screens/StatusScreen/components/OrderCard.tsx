import StyledButton from "$components/ui/StyledButton";
import StyledChip from "$components/ui/StyledChip";
import { Order, OrderStatus } from "$types/order.type";
import { convertTimeToString } from "$utils/time";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Checkbox, Divider, Text, useTheme } from "react-native-paper";
import { StatusScreenContext } from "../context/StatusScreenContext";
import { StatusScreenActionType } from "../context/status-context.type";
import makePhoneCall from "$utils/phone";

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ ...props }) => {
    const { order } = props;
    const { dispatch, orderStatus } = React.useContext(StatusScreenContext);
    const theme = useTheme();
    return (
        <Card
            className="mb-4"
            style={{
                minHeight: 200,
                width: "auto",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            }}
        >
            <Card.Title
                titleVariant="titleMedium"
                titleNumberOfLines={1}
                titleStyle={{
                    height: 20,
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                }}
                className="px-2 py-0"
                subtitleNumberOfLines={0}
                style={{
                    backgroundColor: theme.colors.primaryContainer,
                    minHeight: 32,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                }}
                title="Tên đơn hàng"
                right={() => (
                    <View className="flex flex-row items-center  py-0">
                        <Text className="py-0 m-0 ">ID: {order.id}</Text>
                        <Checkbox status="checked" />
                    </View>
                )}
            />
            <Card.Content>
                <View className="flex flex-row justify-between items-center mt-2">
                    <View className="flex flex-row justify-between">
                        <StyledChip
                            mode="outlined"
                            compact={true}
                            className="rounded-[50px]"
                            textStyle={{ fontSize: 10 }}
                        >
                            Giao lần 1
                        </StyledChip>
                        <StyledChip
                            mode="outlined"
                            compact={true}
                            className="rounded-[50px] ml-1"
                            textStyle={{
                                fontSize: 10,
                                marginTop: 0,
                                marginBottom: 0,
                            }}
                        >
                            Trong ngày
                        </StyledChip>
                    </View>
                    <Text>{convertTimeToString(order.datetime)}</Text>
                </View>
                <Text variant="bodyMedium" className="flex flex-row mt-1">
                    <Text
                        className="text-[14px] leading-6 tracking-[-0.132px]"
                        style={styles.textBold}
                    >
                        Tên khách hàng:{" "}
                    </Text>
                    {order.customer.user.fullname}
                </Text>
                <Text variant="bodyMedium" className="flex flex-row">
                    <Text
                        className="text-[14px] leading-6 tracking-[-0.132px]"
                        style={styles.textBold}
                    >
                        SĐT:{" "}
                    </Text>
                    {order.phone}
                </Text>
                <Text variant="bodyMedium" className="flex flex-row">
                    <Text
                        className="text-[14px] leading-6 tracking-[-0.132px]"
                        style={styles.textBold}
                    >
                        Địa chỉ:{" "}
                    </Text>
                    {order.address}
                </Text>
                {order?.note && (
                    <>
                        <Divider className="mt-2 mb-2" />
                        <Text
                            variant="bodyMedium"
                            className="flex flex-row mb-2"
                        >
                            <Text
                                className="text-[14px] leading-6 tracking-[-0.132px]"
                                style={styles.textBold}
                            >
                                Chú ý:{" "}
                            </Text>
                            {order?.note}
                        </Text>
                    </>
                )}
            </Card.Content>
            {orderStatus === OrderStatus.DELIVERING && (
                <Card.Actions className="px-4">
                    <StyledButton
                        onPress={() =>
                            dispatch({
                                type: StatusScreenActionType.SHOW_REPORT_DIALOG,
                                payload: {},
                            })
                        }
                        mode="text"
                        className="p-0 min-h-[20px]"
                    >
                        Báo cáo
                    </StyledButton>
                    <StyledButton onPress={() => makePhoneCall("84339614544")}>
                        Liên hệ
                    </StyledButton>
                </Card.Actions>
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    textBold: {
        fontWeight: "bold",
    },
});

export default OrderCard;
