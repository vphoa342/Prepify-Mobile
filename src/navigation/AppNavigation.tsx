import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "$pages/LoginScreen";
import About from "$pages/AboutScreen";
import Home from "$pages/HomeScreen";
import { useContext } from "react";
import { AuthContext } from "src/contexts/auth/AuthContext";
import React from "react";
import { AuthNavigation } from "./AuthNavigation";
import { MainNavigation } from "./MainNavigation";

export const AppNavigation = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            {!isAuthenticated ? <AuthNavigation /> : <MainNavigation />}
        </NavigationContainer>
    );
};
