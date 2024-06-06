import StyledButton from "$components/ui/StyledButton";
import { signIn } from "$contexts/auth/auth.reducer";
import useAuth from "$hooks/useAuth";
import { SYSTEM_MESSAGES } from "$utils/constant";
import { TeddyConfig } from "$utils/rive";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { Linking, Text, View } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import Rive, { Alignment, RiveRef } from "rive-react-native";
import {
    getGoogleAuthUrl,
    getGoogleUrlQueryKey,
    getMe,
    getMeQueryKey,
    loginWithGoogle,
} from "src/apis/user.api";

const STALE_TIME_GOOGLE_AUTH_URL = 1000 * 60 * 60; // 1 hour

interface AuthFormProps {
    navigation: any;
    route?: any;
    children: React.ReactNode;
    riveRef: React.RefObject<RiveRef>;
    title: string;
}

const AuthForm = ({
    navigation,
    route,
    title,
    children,
    riveRef,
}: AuthFormProps) => {
    const params = route.params;
    const code = useMemo(() => params?.code, [params]);
    const { dispatch } = useAuth();
    const theme = useTheme();
    // -----------------------------LOGIN WITH GOOGLE---------------------------------
    const { data: googleUrl } = useQuery({
        queryKey: [getGoogleUrlQueryKey],
        queryFn: () => getGoogleAuthUrl(),
        staleTime: STALE_TIME_GOOGLE_AUTH_URL,
        refetchOnWindowFocus: false,
    });

    const url = useMemo(
        () => (googleUrl && googleUrl.data.data.url) || "",
        [googleUrl]
    );

    const { mutate: googleMutate } = useMutation({
        mutationFn: ({
            code,
            signal,
        }: {
            code: string;
            signal?: AbortSignal;
        }) => loginWithGoogle(code, signal),
    });
    // Query for get user info
    const { refetch: userRefetch } = useQuery({
        queryKey: [getMeQueryKey],
        queryFn: () => getMe(),
        enabled: false,
    });

    useEffect(() => {
        const controller = new AbortController();

        code &&
            googleMutate(
                { code },
                {
                    onSuccess: async () => {
                        const { data } = await userRefetch();
                        if (data) {
                            const user = data.data.data.user;
                            dispatch(signIn({ isAuthenticated: true, user }));
                        }
                    },
                    onError: () => {
                        Toast.show({
                            type: "error",
                            text1: "Error",
                            text2: SYSTEM_MESSAGES.SOMETHING_WENT_WRONG,
                        });
                    },
                }
            );

        return () => {
            controller.abort();
        };
    }, [code, dispatch, googleMutate, userRefetch]);

    const handleLoginWithGoogle = async () => {
        // Handle login with Google
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: `Don't know how to open this URL: ${url}`,
            });
        }
    };

    return (
        <Surface
            className="rounded-xl p-6 relative"
            style={{ height: 500 }}
            elevation={2}
        >
            <Rive
                resourceName={TeddyConfig.resourceName}
                stateMachineName={TeddyConfig.stateMachineName}
                style={{
                    width: 300,
                    height: 300,
                    position: "absolute",
                    top: -200,
                    left: 25,
                }}
                autoplay={false}
                ref={riveRef}
                alignment={Alignment.Center}
            />
            <Text className="text-2xl font-bold mb-4 w-full text-center mt-20">
                {title}
            </Text>
            <View>{children}</View>
            <StyledButton
                style={{ backgroundColor: theme.colors.primary }}
                className="mt-4"
                mode="contained"
                onPress={handleLoginWithGoogle}
                icon="google"
            >
                Tiếp tục với Google
            </StyledButton>
        </Surface>
    );
};

export default AuthForm;
