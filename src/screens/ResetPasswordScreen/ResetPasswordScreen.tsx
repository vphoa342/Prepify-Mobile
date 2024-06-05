import { resetPassword } from "$apis/user.api";
import { resetPasswordSchema } from "$components/common/AuthForm/AuthForm.schema";
import StyledButton from "$components/ui/StyledButton";
import { USER_MESSAGES } from "$utils/constant";
import { TeddyConfig, teddyHandsUp } from "$utils/rive";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { HelperText, Surface, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Rive, { Alignment, RiveRef } from "rive-react-native";
import { z } from "zod";

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
    const riveRef = React.useRef<RiveRef>(null);
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
                <Surface
                    className="rounded-xl p-6 relative"
                    style={{ height: 600 }}
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
                    <Text className="text-2xl font-bold mb-4 mt-20 w-full text-center">
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
                                placeholder="Mật khẩu mới"
                                mode="outlined"
                                dense={true}
                                onBlur={(e) => {
                                    onBlur();
                                    teddyHandsUp(riveRef, false);
                                }}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                                onFocus={() => {
                                    teddyHandsUp(riveRef, true);
                                }}
                            />
                        )}
                    />
                    <HelperText
                        type="error"
                        visible={errors.password ? true : false}
                    >
                        {errors.password?.message}
                    </HelperText>
                    <Text className=" text-gray-700">Nhập lại mật khẩu</Text>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Nhập lại mật khẩu"
                                mode="outlined"
                                dense={true}
                                onBlur={(e) => {
                                    onBlur();
                                    teddyHandsUp(riveRef, false);
                                }}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                                onFocus={() => {
                                    teddyHandsUp(riveRef, true);
                                }}
                            />
                        )}
                    />
                    <HelperText
                        type="error"
                        visible={errors.confirmPassword ? true : false}
                    >
                        {errors.confirmPassword?.message}
                    </HelperText>
                    <View className="flex-row justify-between items-center">
                        <StyledButton
                            className="flex-1"
                            mode="contained"
                            onPress={handleSubmit(handleResetPassword)}
                        >
                            Đặt lại mật khẩu
                        </StyledButton>
                        <StyledButton className="ml-4" onPress={handleLogin}>
                            Đã có tài khoản?
                        </StyledButton>
                    </View>
                    <StyledButton
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

export default ResetPasswordScreen;
