import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Toast from "react-native-toast-message";
import { AuthProvider } from "src/contexts/auth/AuthContext";
import { AppNavigation } from "src/navigation/AppNavigation";


export default function App() {
    const queryClient = new QueryClient();
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
