import OrderListView from "$components/common/Home/OrderListView";
import ShipmentOverviewCard from "$components/common/Home/ShipmentOverviewCard";
import WelcomeCard from "$components/common/Home/WelcomeCard";
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

type HomeScreenNavigationType = CompositeScreenProps<
    MainScreenProps<AppScreens.AppBottomTabScreen>,
    AppBottomTabScreenProps<AppScreens.HomeScreen>
>["navigation"];

const HomeScreen = () => {
    const { user, dispatch } = useAuth();
    const navigation = useNavigation<HomeScreenNavigationType>();

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
                <OrderListView />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
