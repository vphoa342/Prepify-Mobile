import { View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import React from "react";
import { resetPasswordSchema } from "$components/common/AuthForm/AuthForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { isAxiosError } from "axios";
import { SYSTEM_MESSAGES, USER_MESSAGES } from "$utils/constant";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "$apis/user.api";

export interface ResetPasswordProps {
    token?: string | null;
}

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;

const resetPasswordFormDefaultValues: ResetPasswordFormType = {
    password: "",
    confirmPassword: "",
};
const ResetPasswordScreen = ({
    navigation,
    route,
}: {
    navigation: any;
    route: any;
}) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ResetPasswordFormType>({
        mode: "all",
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: resetPasswordFormDefaultValues,
    });

    const { token } = route.params;

    // Mutation reset password
    const { mutate: resetPasswordMutate, isPending: isResetPasswordPending } =
        useMutation({
            mutationFn: ({
                token,
                password,
            }: {
                token: string;
                password: string;
            }) => resetPassword(token, password),
        });

    const handleResetPassword = (data: ResetPasswordFormType) => {
        if (isResetPasswordPending) return;
        resetPasswordMutate(
            { token: token as string, password: data.password },
            {
                onSuccess: () => {
                    reset();
                    Toast.show({
                        type: "success",
                        text1: "Success",
                        text2: USER_MESSAGES.RESET_PASSWORD_SUCCESS,
                    });
                },
                onError: (error) => {
                    let errMessage: string =
                        USER_MESSAGES.RESET_PASSWORD_FAILED;
                    if (isAxiosError<Error>(error)) {
                        errMessage =
                            error.response?.data.message ??
                            USER_MESSAGES.RESET_PASSWORD_FAILED;
                    }
                    Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: errMessage,
                    });
                },
            }
        );
    };

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    const handleLoginWithGoogle = () => {
        console.log("Login with Google");
    };
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center p-4">
                <Surface className="rounded-xl p-6" elevation={2}>
                    <Text className="text-2xl font-bold mb-4 w-full text-center">
                        Đặt lại mật khẩu
                    </Text>
                    <Text className="mb-1 text-slate-500">
                        Phải từ 8 đến 16 ký tự, bao gồm một số, một chữ cái viết
                        hoa và một chữ cái viết thường.
                    </Text>
                    <Text className="text-gray-700">Mật khẩu</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
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
                    <Text className="mt-2 text-gray-700">
                        Nhập lại mật khẩu
                    </Text>
                    <Controller
                        control={control}
                        name="confirmPassword"
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
                    {errors.confirmPassword && (
                        <Text className="text-red-500">
                            {errors.confirmPassword.message}
                        </Text>
                    )}
                    <View className="flex-row justify-between items-center mt-4">
                        <Button
                            className="flex-1"
                            mode="contained"
                            onPress={handleSubmit(handleResetPassword)}
                        >
                            Đặt lại mật khẩu
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

export default ResetPasswordScreen;
