import StyledButton from "$components/ui/StyledButton";
import { Order } from "$types/order.type";
import { convertTimeToString } from "$utils/time";
import React from "react";
import { View } from "react-native";
import { Card, Checkbox, Chip, Text, useTheme } from "react-native-paper";

interface OrderCardProps {
    order: Order;
    isActionShown: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ ...props }) => {
    const { order, isActionShown } = props;
    const theme = useTheme();
    return (
        <Card
            mode="outlined"
            className="shadow-xl"
            style={{ height: 200, width: 350 }}
        >
            <Card.Title
                titleVariant="titleMedium"
                titleNumberOfLines={1}
                titleStyle={{
                    height: 20,
                }}
                className="px-2 py-0"
                subtitleNumberOfLines={0}
                style={{
                    backgroundColor: theme.colors.primaryContainer,
                    minHeight: 20,
                }}
                title="Tên đơn hàng"
                right={(props) => (
                    <View className="flex flex-row items-center  py-0">
                        <Text className="py-0 m-0 ">ID: {order.id}</Text>
                        <Checkbox status="checked" />
                    </View>
                )}
            />
            <Card.Content>
                <View className="flex flex-row justify-between">
                    <View className="flex flex-row justify-between">
                        <Chip
                            mode="outlined"
                            compact={true}
                            className="rounded-[50px]"
                            textStyle={{ fontSize: 10 }}
                            children={"Giao lần 1"}
                        />
                        <Chip
                            mode="outlined"
                            compact={true}
                            className="rounded-[50px]"
                            textStyle={{ fontSize: 10 }}
                            children={"Trong ngày"}
                        />
                    </View>
                    <Text>{convertTimeToString(order.datetime)}</Text>
                </View>
                <Text variant="bodyMedium" className="flex flex-row">
                    <Text className="text-[14px] not-italic font-semibold leading-6 tracking-[-0.132px]">
                        Tên khách hàng:{" "}
                    </Text>
                    {order.customer.user.fullname}
                </Text>
                <Text variant="bodyMedium" className="flex flex-row">
                    <Text className="text-[14px] not-italic font-semibold leading-6 tracking-[-0.132px]">
                        SĐT:{" "}
                    </Text>
                    {order.phone}
                </Text>
                <Text variant="bodyMedium" className="flex flex-row">
                    <Text className="text-[14px] not-italic font-semibold leading-6 tracking-[-0.132px]">
                        Địa chỉ:{" "}
                    </Text>
                    {order.address}
                </Text>
            </Card.Content>
            {isActionShown && (
                <Card.Actions>
                    <StyledButton className="p-0">Báo cáo</StyledButton>
                    <StyledButton>Liên hệ</StyledButton>
                </Card.Actions>
            )}
        </Card>
    );
};

export default OrderCard;
