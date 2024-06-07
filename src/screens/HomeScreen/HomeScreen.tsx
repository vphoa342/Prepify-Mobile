import OrderListView from "$components/common/Home/OrderListView";
import ShipmentOverviewCard from "$components/common/Home/ShipmentOverviewCard";
import WelcomeCard from "$components/common/Home/WelcomeCard";
import useAuth from "$hooks/useAuth";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const { user, dispatch } = useAuth();

    return (
        <SafeAreaView className="px-4 py-4">
            <ScrollView>
                <WelcomeCard userName={user?.fullname ?? ""} />
                <ShipmentOverviewCard />
                <OrderListView />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
