import React from "react";
import { AuthProvider } from "src/contexts/auth/AuthContext";
import { AppNavigation } from "src/navigation/AppNavigation";


export default function App() {
return (
        <AuthProvider>
            <AppNavigation />
        </AuthProvider>
    );

}
