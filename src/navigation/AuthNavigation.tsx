import LoginScreen from "$screens/LoginScreen";
import ForgotPasswordScreen from "$screens/ForgotPasswordScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ResetPasswordScreen from "$screens/ResetPasswordScreen";
import { AppScreens, AuthNavigationParamList } from "$configs/routes";

export const AuthNavigation = () => {
    const Stack = createNativeStackNavigator<AuthNavigationParamList>();
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name={AppScreens.LoginScreen}
                component={LoginScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name={AppScreens.ForgotPasswordScreen}
                component={ForgotPasswordScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name={AppScreens.ResetPasswordScreen}
                component={ResetPasswordScreen}
            />
        </Stack.Navigator>
    );
};
