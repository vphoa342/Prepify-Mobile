import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Surface, TextInput } from "react-native-paper";
import { z } from "zod";
import { forgotPasswordSchema } from "$components/common/AuthForm/AuthForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useCountdown from "$hooks/useCountdown";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "src/apis/user.api";
import Toast from "react-native-toast-message";
import { USER_MESSAGES } from "$utils/constant";
import isAxiosError from "$utils/isAxiosError";

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;
const forgotPasswordFormDefaultValues: ForgotPasswordFormType = {
    email: "",
};

const COUNT_START = 60;

const ForgotPasswordScreen = ({ navigation }: { navigation: any }) => {
    const [count, { startCountdown }] = useCountdown({
        countStart: COUNT_START,
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ForgotPasswordFormType>({
        mode: "all",
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: forgotPasswordFormDefaultValues,
    });

    // Forgot password with system account
    const { mutate: forgotPasswordMutate, isPending: isForgotPasswordPending } =
        useMutation({
            mutationFn: (body: ForgotPasswordFormType) =>
                forgotPassword(body.email),
        });

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    const handleForgotPassword = (data: ForgotPasswordFormType) => {
        if (isForgotPasswordPending) return;
        forgotPasswordMutate(data, {
            onSuccess: () => {
                reset();
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: USER_MESSAGES.FORGOT_PASSWORD_SUCCESS,
                });
                startCountdown();
            },
            onError: (error) => {
                let errMessage: string = USER_MESSAGES.FORGOT_PASSWORD_FAILED;
                if (isAxiosError<Error>(error)) {
                    errMessage =
                        error.response?.data.message ??
                        USER_MESSAGES.FORGOT_PASSWORD_FAILED;
                }
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: errMessage,
                });
            },
        });
    };

    const handleLoginWithGoogle = () => {
        // Handle login with Google
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center p-4">
                <Surface className="rounded-xl p-6" elevation={2}>
                    <Text className="text-2xl font-bold mb-4 w-full text-center">
                        Quên mật khẩu
                    </Text>
                    <Text className="mb-1 text-slate-500">
                        Nhập email của bạn bên dưới để nhận hướng dẫn đặt lại
                        mật khẩu.
                    </Text>
                    {count != COUNT_START && (
                        <Text className="text-sm text-[rgba(0,_0,_0,_0.45)]">
                            Không nhận được hướng dẫn? Hãy thử lại sau {count}{" "}
                            giây
                        </Text>
                    )}
                    <Text className="text-gray-700 mt-4">Email</Text>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="mb-1"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="customer@example.com"
                            />
                        )}
                    />
                    {errors.email && (
                        <Text className="text-red-500">
                            {errors.email.message}
                        </Text>
                    )}

                    <View className="flex-row justify-between items-center mt-4">
                        <Button
                            className="flex-1"
                            mode="contained"
                            onPress={handleSubmit(handleForgotPassword)}
                        >
                            Lấy lại mật khẩu
                        </Button>
                        <Button className="ml-4" onPress={handleLogin}>
                            Đã có tài khoản?
                        </Button>
                    </View>
                    <Button
                        className="mt-4"
                        mode="contained"
                        onPress={handleLoginWithGoogle}
                        icon="google"
                    >
                        Tiếp tục với Google
                    </Button>
                </Surface>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;
