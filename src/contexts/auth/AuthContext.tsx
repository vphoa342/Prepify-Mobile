import { AuthContextType, AuthState } from "$types/auth.type";
import { getValue } from "$utils/secure-store";
import { useQuery } from "@tanstack/react-query";
import React, {
    FC,
    PropsWithChildren,
    createContext,
    useEffect,
    useReducer,
} from "react";
import { getMe, getMeQueryKey } from "src/apis/user.api";
import { initialize, reducer } from "./auth.reducer";
import { ACCESS_TOKEN_KEY, SYSTEM_MESSAGES } from "$utils/constant";
import Toast from "react-native-toast-message";
import Loading from "$components/common/Loading";

const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const AuthContext = createContext<AuthContextType>({
    ...initialState,
    dispatch: () => null,
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { refetch: userRefetch } = useQuery({
        queryKey: [getMeQueryKey],
        queryFn: () => getMe(),
        enabled: false,
    });

    useEffect(() => {
        (async () => {
            const accessToken = await getValue(ACCESS_TOKEN_KEY);
            if (!accessToken) {
                return dispatch(
                    initialize({ isAuthenticated: false, user: null })
                );
            }

            const { data, error } = await userRefetch();
            if (data) {
                const user = data.data.data.user;
                dispatch(initialize({ isAuthenticated: true, user }));
            }

            if (error) {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: SYSTEM_MESSAGES.SOMETHING_WENT_WRONG,
                });
                dispatch(initialize({ isAuthenticated: false, user: null }));
            }
        })();
    }, [userRefetch]);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {state.isInitialized ? children : <Loading />}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
