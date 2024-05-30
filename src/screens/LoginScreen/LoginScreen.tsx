import { loginSchema } from "$components/common/AuthForm/AuthForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    getGoogleAuthUrl,
    getGoogleUrlQueryKey,
    getMe,
    login,
    loginWithGoogle,
} from "src/apis/user.api";
import { AuthContext } from "src/contexts/auth/AuthContext";
import { z } from "zod";
import Toast from "react-native-toast-message";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signIn } from "$contexts/auth/auth.reducer";
import { AUTH_MESSAGES } from "$utils/constant";

export type LoginFormType = z.infer<typeof loginSchema>;
const loginFormDefaultValues: LoginFormType = {
    phone: "",
    password: "",
};

const STALE_TIME_GOOGLE_AUTH_URL = 1000 * 60 * 60; // 1 hour

const Login = () => {
    const theme = useTheme();

    // -----------------------------LOGIN WITH GOOGLE---------------------------------

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
            },
            onError: (err) => {
                console.log(err);
                Toast.show({
                    type: "error",
                    text1: AUTH_MESSAGES.LOGIN_TITLE_FAILED,
                });
            },
        });
    };
    const handleForgotPassword = () => {
        // Handle forgot password
    };

    const handleLoginWithGoogle = () => {
        // Handle login with Google
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center p-4">
                <Text className="mb-2 text-gray-700">Tài khoản</Text>
                <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="mb-4"
                            label="Số điện thoại"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            textContentType="telephoneNumber"
                            keyboardType="phone-pad"
                        />
                    )}
                />
                {errors.phone && <Text>{errors.phone.message}</Text>}
                <Text className="mb-2 text-gray-700">Mật khẩu</Text>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="Mật khẩu"
                            className="mb-4"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                />
                {errors.password && <Text>{errors.password.message}</Text>}
                <View className="flex-row justify-between items-center mb-4">
                    <Button
                        className="flex-1"
                        mode="contained"
                        onPress={handleSubmit(handleLogin)}
                    >
                        Đăng nhập
                    </Button>
                    <Button className="ml-4" onPress={handleForgotPassword}>
                        Quên mật khẩu?
                    </Button>
                </View>
                <Button
                    className="mt-4"
                    mode="contained"
                    onPress={handleLoginWithGoogle}
                    icon="google"
                    color={theme.colors.primary}
                >
                    Tiếp tục với Google
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default Login;

// TODO: Change border of button
