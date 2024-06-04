import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { AuthContext } from "src/contexts/auth/AuthContext";
import { AuthNavigation } from "./AuthNavigation";
import { MainNavigation } from "./MainNavigation";
import * as Linking from "expo-linking";
import { PaperProvider, Text } from "react-native-paper";
import CombinedPrepifyTheme from "$configs/theme";

const prefix = Linking.createURL("/");

export const AppNavigation = () => {
    const { isAuthenticated } = useContext(AuthContext);

    const config = {
        screens: {
            Login: "login",
            ResetPassword: "reset-password",
        },
    };

    const linking = {
        prefixes: [prefix, "https://prepify.thanhf.dev"],
        config,
    };
    return (
        <PaperProvider theme={CombinedPrepifyTheme}>
            <NavigationContainer
                linking={linking}
                fallback={<Text>Loading...</Text>}
                theme={CombinedPrepifyTheme}
            >
                {!isAuthenticated ? <AuthNavigation /> : <MainNavigation />}
            </NavigationContainer>
        </PaperProvider>
    );
};
