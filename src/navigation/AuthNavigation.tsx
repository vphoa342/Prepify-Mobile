import Login from "$pages/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

export const AuthNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
            />
        </Stack.Navigator>
    );
};
