import { loginSchema } from "$components/common/AuthForm/AuthForm.schema";
import StyledButton from "$components/ui/StyledButton";
import { signIn } from "$contexts/auth/auth.reducer";
import { AUTH_MESSAGES } from "$utils/constant";
import { TeddyConfig, teddyChecking, teddyHandsUp } from "$utils/rive";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React, { useContext, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Linking, Text, View } from "react-native";
import { Button, Surface, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Rive, { Alignment, RiveRef } from "rive-react-native";
import {
    getGoogleAuthUrl,
    getGoogleUrlQueryKey,
    getMe,
    login,
    loginWithGoogle,
} from "src/apis/user.api";
import { AuthContext } from "src/contexts/auth/AuthContext";
import { z } from "zod";

export type LoginFormType = z.infer<typeof loginSchema>;
const loginFormDefaultValues: LoginFormType = {
    phone: "",
    password: "",
};

const STALE_TIME_GOOGLE_AUTH_URL = 1000 * 60 * 60; // 1 hour

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const riveRef = React.useRef<RiveRef>(null);
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

    // Mutation for login with google
    const { mutate: googleMutate } = useMutation({
        mutationFn: ({
            code,
            signal,
        }: {
            code: string;
            signal?: AbortSignal;
        }) => loginWithGoogle(code, signal),
    });

    // // Query for get user info
    // const { refetch: userRefetch } = useQuery({
    //     queryKey: [getMeQueryKey],
    //     queryFn: () => getMe(),
    //     enabled: false,
    // });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormType>({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: loginFormDefaultValues,
    });

    const { dispatch } = useContext(AuthContext);
    const { mutate: loginMutate, isPending: isLoginPending } = useMutation({
        mutationFn: (body: LoginFormType) => login(body),
    });

    const handleLogin = async (data: LoginFormType) => {
        if (isLoginPending) return;
        loginMutate(data, {
            onSuccess: async (res) => {
                reset();
                const userResponse = await getMe();

                dispatch(
                    signIn({
                        isAuthenticated: true,
                        user: userResponse.data.data.user,
                    })
                );
                // useDispatchAuth();
            },
            onError: (error) => {
                let errMessage: string = AUTH_MESSAGES.LOGIN_TITLE_FAILED;
                if (isAxiosError<Error>(error)) {
                    errMessage =
                        error.response?.data.message ??
                        AUTH_MESSAGES.LOGIN_TITLE_FAILED;
                }
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: errMessage,
                });
            },
        });
    };
    const handleForgotPassword = () => {
        // Handle forgot password
        navigation.navigate("ForgotPassword");
    };

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
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center p-4">
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
                        Welcome back
                    </Text>
                    <Text className="text-gray-700">Tài khoản</Text>
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="mb-2"
                                dense={true}
                                placeholder="Số điện thoại"
                                mode="outlined"
                                onBlur={() => {
                                    onBlur();
                                    teddyChecking(riveRef, false);
                                }}
                                onChangeText={onChange}
                                value={value}
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
                                onFocus={() => {
                                    teddyChecking(riveRef, true);
                                }}
                            />
                        )}
                    />
                    {errors.phone && (
                        <Text className="text-red-500">
                            {errors.phone.message}
                        </Text>
                    )}
                    <Text className="mt-2 text-gray-700">Mật khẩu</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Mật khẩu"
                                className="mb-4"
                                mode="outlined"
                                dense={true}
                                onBlur={(e) => {
                                    onBlur();
                                    teddyHandsUp(riveRef, false);
                                }}
                                onChangeText={onChange}
                                value={value}
                                onFocus={() => {
                                    teddyHandsUp(riveRef, true);
                                }}
                                secureTextEntry
                            />
                        )}
                    />
                    {errors.password && (
                        <Text className="text-red-500">
                            {errors.password.message}
                        </Text>
                    )}
                    <View className="flex-row justify-between items-center mt-4">
                        <StyledButton
                            className="flex-1"
                            mode="contained"
                            onPress={handleSubmit(handleLogin)}
                        >
                            Đăng nhập
                        </StyledButton>
                        <Button className="ml-4" onPress={handleForgotPassword}>
                            Quên mật khẩu?
                        </Button>
                    </View>
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
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

// TODO:  Authorization just shipper can login
