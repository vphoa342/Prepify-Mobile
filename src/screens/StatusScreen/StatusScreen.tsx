import OrderListView from "$components/common/OrderListView";
import StautsSegmentedButtons from "$components/screens/StatusScreen/StatusSegmentedButtons";
import { Order, OrderStatus } from "$types/order.type";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ordersData from "../../../orders.json";

const titleMapping = {
    [OrderStatus.DELIVERING]: "Đang giao",
    [OrderStatus.DELIVERED]: "Hoàn thành",
    [OrderStatus.DELAYED]: "Bị hoãn",
    [OrderStatus.CANCELLED]: "Đã hủy",
};

const StatusScreen = () => {
    const [orderStatus, setOrderStatus] = React.useState<OrderStatus>(
        OrderStatus.DELIVERING
    );
    const [title, setTitle] = React.useState("");
    const [orders, setOrders] = React.useState<Order[]>(ordersData);

    useEffect(() => {
        setTitle(titleMapping[orderStatus]);
        setOrders(ordersData);
    }, [orderStatus]);

    return (
        <SafeAreaView className="flex-1 justify-center px-4 py-4">
            <ScrollView>
                <StautsSegmentedButtons
                    orderStatus={orderStatus}
                    onOrderStatus={setOrderStatus}
                />
                <OrderListView
                    orders={orders}
                    title={title}
                    isActionShown={true}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default StatusScreen;
