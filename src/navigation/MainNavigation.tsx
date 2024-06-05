import BoxIcon from "$components/common/Icon/BoxIcon";
import AboutScreen from "$screens/AboutScreen";
import HomeScreen from "$screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeIcon, SettingsIcon } from "lucide-react-native";
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
                        // return <HomeIcon size={size} color={color} />;
                        return <BoxIcon size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Settings"
                component={AboutScreen}
                options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => {
                        return <SettingsIcon size={size} color={color} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
};
