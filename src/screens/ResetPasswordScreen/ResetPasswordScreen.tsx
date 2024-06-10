import { resetPassword } from "$apis/user.api";
import AuthForm from "$components/common/AuthForm/AuthForm";
import { resetPasswordSchema } from "$components/common/AuthForm/AuthForm.schema";
import StyledButton from "$components/ui/StyledButton";
import { AppScreens, AuthScreenProps } from "$configs/routes";
import { USER_MESSAGES } from "$utils/constant";
import { teddyHandsUp } from "$utils/rive";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { HelperText, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { RiveRef } from "rive-react-native";
import { z } from "zod";

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;

const resetPasswordFormDefaultValues: ResetPasswordFormType = {
    password: "",
    confirmPassword: "",
};

type ResetPasswordScreenNavigationType =
    AuthScreenProps<AppScreens.ResetPasswordScreen>["navigation"];
type ResetPasswordScreenRouteType =
    AuthScreenProps<AppScreens.ResetPasswordScreen>["route"];

const ResetPasswordScreen = () => {
    const riveRef = React.useRef<RiveRef>(null);
    const route = useRoute<ResetPasswordScreenRouteType>();
    const navigation = useNavigation<ResetPasswordScreenNavigationType>();
    const token = useMemo(() => route.params?.token, [route]);
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
        navigation.navigate(AppScreens.LoginScreen);
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center p-4">
                <AuthForm title="Đặt lại mật khẩu" riveRef={riveRef}>
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
                </AuthForm>
            </View>
        </SafeAreaView>
    );
};

export default ResetPasswordScreen;
