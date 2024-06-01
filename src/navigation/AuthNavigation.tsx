import LoginScreen from "$screens/LoginScreen";
import ForgotPasswordScreen from "$screens/ForgotPasswordScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ResetPasswordScreen from "$screens/ResetPasswordScreen";

export const AuthNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="ForgotPassword"
                component={ForgotPasswordScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="ResetPassword"
                component={ResetPasswordScreen}
            />
        </Stack.Navigator>
    );
};
