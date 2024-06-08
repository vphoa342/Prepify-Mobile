import { Order } from "$types/order.type";
import React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import OrderCard from "../OrderCard";

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
                    <Text
                        className="ml-2 rounded-[50px] p-1"
                        style={{ backgroundColor: theme.colors.primary }}
                    >
                        {orders.length}
                    </Text>
                </View>
                {isStartDelivery && (
                    <Button
                        mode="elevated"
                        className="min-h-[14px]"
                        style={{ alignSelf: "flex-start" }}
                        contentStyle={{ height: 40, width: 150, padding: 0 }}
                        labelStyle={{ fontSize: 10 }}
                    >
                        Bắt đầu giao hàng
                    </Button>
                )}
            </View>
            <View className="flex flex-col justify-between mt-2">
                {orders.map((order) => (
                    <OrderCard
                        order={order}
                        isActionShown={isActionShown ?? false}
                    />
                ))}
            </View>
        </View>
    );
};

export default OrderListView;
