import { loginSchema } from "$components/common/AuthForm/AuthForm.schema";
import { signIn } from "$contexts/auth/auth.reducer";
import useDispatchAuth from "$hooks/useDispatchAuth";
import { AUTH_MESSAGES } from "$utils/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button, Surface, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { getMe, login } from "src/apis/user.api";
import { AuthContext } from "src/contexts/auth/AuthContext";
import { z } from "zod";

export type LoginFormType = z.infer<typeof loginSchema>;
const loginFormDefaultValues: LoginFormType = {
    phone: "",
    password: "",
};

const STALE_TIME_GOOGLE_AUTH_URL = 1000 * 60 * 60; // 1 hour

const LoginScreen = ({ navigation }: { navigation: any }) => {
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

    const handleLoginWithGoogle = () => {
        // Handle login with Google
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center p-4">
                <Surface className="rounded-xl p-6" elevation={2}>
                    <Text className="text-2xl font-bold mb-4 w-full text-center">
                        Welcome back
                    </Text>
                    <Text className="text-gray-700">Tài khoản</Text>
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
                                label="Mật khẩu"
                                className="mb-4"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
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
                </Surface>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

// TODO: Change border of button
// TODO:  Authorization just shipper can login
