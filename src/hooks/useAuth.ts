import { useContext } from "react";

import { AuthContext } from "$contexts/auth/AuthContext";

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Auth context must be used within an AuthProvider");
    }

    return context;
};

export default useAuth;
