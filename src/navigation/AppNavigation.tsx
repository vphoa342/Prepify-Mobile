import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { AuthContext } from "src/contexts/auth/AuthContext";
import { AuthNavigation } from "./AuthNavigation";
import { MainNavigation } from "./MainNavigation";
import * as Linking from "expo-linking";
import { Text } from "react-native-paper";

const prefix = Linking.createURL("/");

export const AppNavigation = () => {
    const { isAuthenticated } = useContext(AuthContext);

    const config = {
        screens: {
            ResetPassword: "reset-password",
        },
    };

    const linking = {
        prefixes: [prefix],
        config,
    };
    return (
        <NavigationContainer
            linking={linking}
            fallback={<Text>Loading...</Text>}
        >
            {!isAuthenticated ? <AuthNavigation /> : <MainNavigation />}
        </NavigationContainer>
    );
};
