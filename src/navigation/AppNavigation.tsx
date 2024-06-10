import configs from "$configs/index";
import CombinedPrepifyTheme from "$configs/theme";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import React, { useContext } from "react";
import { PaperProvider, Text } from "react-native-paper";
import { AuthContext } from "src/contexts/auth/AuthContext";
import { AuthNavigation } from "./AuthNavigation";
import { MainNavigation } from "./MainNavigation";

const prefix = Linking.createURL("/");

export const AppNavigation = () => {
    const { isAuthenticated } = useContext(AuthContext);

    const config = {
        screens: {
            Login: configs.auth.loginRedirectUrl,
            ResetPassword: configs.auth.resetPasswordRedirectUrl,
        },
    };

    const linking = {
        prefixes: [prefix, configs.auth.universalLink],
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
