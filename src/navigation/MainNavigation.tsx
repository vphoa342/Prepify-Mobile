import BoxIcon from "$components/common/Icon/BoxIcon";
import TrustFastIcon from "$components/common/Icon/TrustFast";
import {
    AppBottomTabNavigationParamList,
    AppScreens,
    MainNavigationParamList,
} from "$configs/routes";
import AboutScreen from "$screens/AboutScreen";
import HomeScreen from "$screens/HomeScreen";
import StatusScreen from "$screens/StatusScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeIcon, SettingsIcon } from "lucide-react-native";
import React from "react";

export const MainNavigation = () => {
    const Drawer = createDrawerNavigator<MainNavigationParamList>();
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerPosition: "right",
            }}
        >
            <Drawer.Screen
                name={AppScreens.AppBottomTabScreen}
                component={MainNavigation}
                options={{
                    title: "Trang chủ",
                    headerShown: false,
                    drawerIcon: ({ color, size }) => {
                        return <HomeIcon size={size} color={color} />;
                    },
                }}
            />
            <Drawer.Screen
                name={AppScreens.ProfileScreen}
                component={AboutScreen}
                options={{
                    title: "Hồ sơ cá nhân",
                    drawerIcon: ({ color, size }) => {
                        return <SettingsIcon size={size} color={color} />;
                    },
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    );
};

export const AppBottomTabNavigation = () => {
    const Tab = createBottomTabNavigator<AppBottomTabNavigationParamList>();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name={AppScreens.HomeScreen}
                component={HomeScreen}
                options={() => ({
                    tabBarLabel: "Đơn hàng",
                    tabBarIcon: ({ color, size }) => {
                        return <BoxIcon size={size} color={color} />;
                    },
                })}
            />
            <Tab.Screen
                name={AppScreens.StatusScreen}
                component={StatusScreen}
                options={() => ({
                    tabBarLabel: "Trạng thái",
                    tabBarIcon: ({ color, size }) => {
                        return <TrustFastIcon size={size} color={color} />;
                    },
                })}
            />
        </Tab.Navigator>
    );
};
