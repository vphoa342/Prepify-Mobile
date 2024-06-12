import { Order } from "$types/order.type";
import React from "react";
import { View } from "react-native";
import { Badge, Button, Text, useTheme } from "react-native-paper";
import OrderCard from "./OrderCard";

interface OrderListViewProps {
    orders: Order[];
    title: string;
    isActionShown?: boolean;
    isStartDelivery?: boolean;
}

const OrderListView: React.FC<OrderListViewProps> = ({ ...props }) => {
    const { orders, title, isStartDelivery, isActionShown } = props;

    const theme = useTheme();
    return (
        <View className="flex flex-col mt-4 h-full">
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row">
                    <Text className="text-xl not-italic font-extrabold leading-6 tracking-[-0.24px] ">
                        {title}
                    </Text>
                    <Badge
                        className="ml-1"
                        theme={{ colors: { primary: theme.colors.primary } }}
                    >
                        {orders.length}
                    </Badge>
                </View>
                {isStartDelivery && (
                    <Button
                        mode="contained-tonal"
                        contentStyle={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            height: 30,
                            width: 140,
                            display: "flex",
                            justifyContent: "center",
                        }}
                        labelStyle={{
                            fontSize: 10,
                            lineHeight: 10,
                        }}
                    >
                        Bắt đầu giao hàng
                    </Button>
                )}
            </View>
            <View className="flex flex-col justify-between mt-2">
                {orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        isActionShown={isActionShown ?? false}
                    />
                ))}
            </View>
        </View>
    );
};

export default OrderListView;
