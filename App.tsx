import usePushNotifications from "$hooks/usePushNotification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { AuthProvider } from "src/contexts/auth/AuthContext";
import { AppNavigation } from "src/navigation/AppNavigation";

if (__DEV__) {
    require("./ReactotronConfig");
}

export default function App() {
    const queryClient = new QueryClient();
    usePushNotifications();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <AppNavigation />
                </AuthProvider>
                <Toast />
            </QueryClientProvider>
        </>
    );
}
