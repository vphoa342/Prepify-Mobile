import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { AuthContext } from "src/contexts/auth/AuthContext";
import { AuthNavigation } from "./AuthNavigation";
import { MainNavigation } from "./MainNavigation";

export const AppNavigation = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <NavigationContainer>
            {!isAuthenticated ? <AuthNavigation /> : <MainNavigation />}
        </NavigationContainer>
    );
};
