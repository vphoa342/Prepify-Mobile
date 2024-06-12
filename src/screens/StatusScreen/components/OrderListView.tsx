import { Order, OrderStatus, TitleMapping } from "$types/order.type";
import React from "react";
import { View } from "react-native";
import { Badge, Button, Text, useTheme } from "react-native-paper";
import OrderCard from "./OrderCard";
import { StatusScreenContext } from "../context/StatusScreenContext";

interface OrderListViewProps {
    orders: Order[];
}

const OrderListView: React.FC<OrderListViewProps> = ({ ...props }) => {
    const { orders } = props;
    const { orderStatus } = React.useContext(StatusScreenContext);

    const theme = useTheme();
    return (
        <View className="flex flex-col mt-4 h-full">
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row">
                    <Text className="text-xl not-italic font-extrabold leading-6 tracking-[-0.24px] ">
                        {TitleMapping[orderStatus!]}
                    </Text>
                    <Badge
                        className="ml-1"
                        theme={{ colors: { primary: theme.colors.primary } }}
                    >
                        {orders.length}
                    </Badge>
                </View>
            </View>
            <View className="flex flex-col justify-between mt-2">
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </View>
        </View>
    );
};

export default OrderListView;
