import BoxIcon from "$components/common/Icon/BoxIcon";
import TrustFastIcon from "$components/common/Icon/TrustFast";
import HomeScreen from "$screens/HomeScreen";
import StatusScreen from "$screens/StatusScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

export const MainNavigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Đơn hàng",
                    tabBarIcon: ({ color, size }) => {
                        return <BoxIcon size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Status"
                component={StatusScreen}
                options={{
                    tabBarLabel: "Trạng thái",
                    tabBarIcon: ({ color, size }) => {
                        return <TrustFastIcon size={size} color={color} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
};
