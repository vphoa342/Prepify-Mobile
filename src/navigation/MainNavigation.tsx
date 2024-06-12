import {
    AppBottomTabNavigationParamList,
    AppScreens,
    MainNavigationParamList,
} from "$configs/routes";
import HomeScreen from "$screens/HomeScreen";
import ProfileScreen from "$screens/ProfileScreen";
import StatusScreen from "$screens/StatusScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeIcon, UserIcon } from "lucide-react-native";
import React from "react";
import { Icon } from "react-native-paper";

export const MainNavigation = () => {
    const Drawer = createDrawerNavigator<MainNavigationParamList>();
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerPosition: "right",
            }}
            initialRouteName={AppScreens.AppBottomTabScreen}
        >
            <Drawer.Screen
                name={AppScreens.AppBottomTabScreen}
                component={AppBottomTabNavigation}
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
                component={ProfileScreen}
                options={{
                    title: "Hồ sơ cá nhân",
                    drawerIcon: ({ color, size }) => {
                        return <UserIcon size={size} color={color} />;
                    },
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
            initialRouteName={AppScreens.HomeScreen}
        >
            <Tab.Screen
                name={AppScreens.HomeScreen}
                component={HomeScreen}
                options={() => ({
                    tabBarLabel: "Đơn hàng",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                source="package-variant-closed"
                                color={color}
                                size={size}
                            />
                        );
                    },
                })}
            />
            <Tab.Screen
                name={AppScreens.StatusScreen}
                component={StatusScreen}
                options={() => ({
                    tabBarLabel: "Trạng thái",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                source="truck-fast"
                                color={color}
                                size={size}
                            />
                        );
                    },
                })}
            />
        </Tab.Navigator>
    );
};
