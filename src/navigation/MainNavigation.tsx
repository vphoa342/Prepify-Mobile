import {
    AppBottomTabNavigationParamList,
    AppScreens,
    MainNavigationParamList,
} from "$configs/routes";
import { AuthContext } from "$contexts/auth/AuthContext";
import { signOut } from "$contexts/auth/auth.reducer";
import HomeScreen from "$screens/HomeScreen";
import MapScreen from "$screens/MapScreen";
import ProfileScreen from "$screens/ProfileScreen";
import StatusScreen from "$screens/StatusScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";
import {
    HomeIcon,
    LogOutIcon,
    MapPinIcon,
    UserIcon,
} from "lucide-react-native";
import React, { useContext } from "react";
import { View } from "react-native";
import { Icon } from "react-native-paper";

const LogoutDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
    const { dispatch } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <View className="flex-1 justify-between">
                <View>
                    <DrawerItemList {...props} />
                </View>
                <DrawerItem
                    style={{ marginBottom: 12 }}
                    label="Đăng xuất"
                    onPress={() => {
                        dispatch(signOut());
                    }}
                    icon={({ color, size }) => (
                        <LogOutIcon size={size} color={color} />
                    )}
                />
            </View>
        </DrawerContentScrollView>
    );
};

export const MainNavigation = () => {
    const Drawer = createDrawerNavigator<MainNavigationParamList>();
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerPosition: "right",
            }}
            drawerContent={(props) => <LogoutDrawerContent {...props} />}
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
            <Tab.Screen
                name={AppScreens.MapScreen}
                component={MapScreen}
                options={() => ({
                    tabBarLabel: "Tuyến đường",
                    tabBarIcon: ({ color, size }) => {
                        return <MapPinIcon size={size} color={color} />;
                    },
                })}
            />
        </Tab.Navigator>
    );
};
