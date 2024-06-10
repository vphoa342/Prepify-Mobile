import ShipmentOverviewCard from "$components/screens/HomeScreen/ShipmentOverviewCard";
import WelcomeCard from "$components/screens/HomeScreen/WelcomeCard";
import {
    AppBottomTabScreenProps,
    AppScreens,
    MainScreenProps,
} from "$configs/routes";
import useAuth from "$hooks/useAuth";
import {
    useNavigation,
    type CompositeScreenProps,
} from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import orders from "../../../orders.json";
import OrderListView from "$components/common/OrderListView";

type HomeScreenNavigationType = CompositeScreenProps<
    MainScreenProps<AppScreens.AppBottomTabScreen>,
    AppBottomTabScreenProps<AppScreens.HomeScreen>
>["navigation"];

const HomeScreen = () => {
    const { user, dispatch } = useAuth();
    const navigation = useNavigation<HomeScreenNavigationType>();
    const title = "Đơn hàng mới";

    const handleAvatarPress = () => {
        navigation.openDrawer();
    };

    return (
        <SafeAreaView className="px-4 py-4">
            <ScrollView>
                <WelcomeCard
                    onAvatarPress={handleAvatarPress}
                    userName={user?.fullname ?? ""}
                />
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
