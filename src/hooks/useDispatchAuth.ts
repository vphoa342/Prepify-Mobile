import { useEffect, useRef } from "react";
import { getMe, getMeQueryKey } from "src/apis/user.api";

import { useQuery } from "@tanstack/react-query";

import { signIn } from "$contexts/auth/auth.reducer";

import useAuth from "./useAuth";

const WAIT_TEDDY_TIME = 2000;

const useDispatchAuth = () => {
    const idTimeOutRef = useRef<NodeJS.Timeout | null>(null);
    const { dispatch } = useAuth();

    // Get current user info
    const { data: userData } = useQuery({
        queryKey: [getMeQueryKey],
        queryFn: () => getMe(),
        enabled: false,
    });

    useEffect(() => {
        if (userData) {
            idTimeOutRef.current = setTimeout(() => {
                const user = userData.data.data.user;
                dispatch(signIn({ isAuthenticated: true, user }));
            }, WAIT_TEDDY_TIME);
        }

        return () => {
            if (idTimeOutRef.current) {
                clearTimeout(idTimeOutRef.current);
            }
        };
    }, [dispatch, userData]);
};

export default useDispatchAuth;
