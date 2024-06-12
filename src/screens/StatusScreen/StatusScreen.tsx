import { Order } from "$types/order.type";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { PaperProvider, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ordersData from "../../../orders.json";
import DelayedDialog from "./components/DelayedDialog";
import OrderListView from "./components/OrderListView";
import ReportDialog from "./components/ReportDialog";
import StautsSegmentedButtons from "./components/StatusSegmentedButtons";
import {
    StatusScreenContext,
    StatusScreenProvider,
} from "./context/StatusScreenContext";
import DeliveredDialog from "./components/DeliveredDialog";
import CanceledDialog from "./components/CanceledDialog";

const WrappedStatusScreen = () => {
    const { orderStatus } = React.useContext(StatusScreenContext);
    const [orders, setOrders] = React.useState<Order[]>(ordersData);

    useEffect(() => {
        setOrders(ordersData);
    }, [orderStatus]);

    return (
        <SafeAreaView className="flex-1 justify-center px-4 py-4">
            <ScrollView>
                <StautsSegmentedButtons />
                <OrderListView orders={orders} />
                <Portal>
                    <ReportDialog />
                    <DeliveredDialog />
                    <DelayedDialog />
                    <CanceledDialog />
                </Portal>
            </ScrollView>
        </SafeAreaView>
    );
};

const StatusScreen = () => {
    return (
        <StatusScreenProvider>
            <PaperProvider>
                <WrappedStatusScreen />
            </PaperProvider>
        </StatusScreenProvider>
    );
};

export default StatusScreen;
