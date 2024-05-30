import AboutScreen from "$pages/AboutScreen";
import HomeScreen from "$pages/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { BottomNavigation } from "react-native-paper";
import { HomeIcon, Icon, SettingsIcon } from "lucide-react-native";

export const MainNavigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            // tabBar={({ navigation, state, descriptors, insets }) => (
            //     <BottomNavigation.Bar
            //         navigationState={state}
            //         safeAreaInsets={insets}
            //         renderIcon={({ route, focused, color }) => {
            //             const { options } = descriptors[route.key];
            //             if (options.tabBarIcon) {
            //                 return options.tabBarIcon({
            //                     focused,
            //                     color,
            //                     size: 24,
            //                 });
            //             }

            //             return null;
            //         }}
            //         getLabelText={({ route }) => {
            //             const { options } = descriptors[route.key];
            //             const label =
            //                 options.tabBarLabel !== undefined
            //                     ? options.tabBarLabel
            //                     : options.title !== undefined
            //                     ? options.title
            //                     : route.title;

            //             return label;
            //         }}
            //     />
            // )}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => {
                        return <HomeIcon size={size} color={color} />;
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
