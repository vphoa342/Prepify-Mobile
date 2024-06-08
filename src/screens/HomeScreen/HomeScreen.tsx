import ShipmentOverviewCard from "$components/screens/HomeScreen/ShipmentOverviewCard";
import WelcomeCard from "$components/screens/HomeScreen/WelcomeCard";
import useAuth from "$hooks/useAuth";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import orders from "../../../orders.json";
import OrderListView from "$components/common/OrderListView";

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const { user, dispatch } = useAuth();
    const title = "Đơn hàng mới";

    return (
        <SafeAreaView className="px-4 py-4">
            <ScrollView>
                <WelcomeCard userName={user?.fullname ?? ""} />
                <ShipmentOverviewCard />
                <OrderListView
                    orders={orders}
                    title={title}
                    isStartDelivery={true}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
