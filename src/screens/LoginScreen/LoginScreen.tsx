import AuthForm from "$components/common/AuthForm/AuthForm";
import { loginSchema } from "$components/common/AuthForm/AuthForm.schema";
import StyledButton from "$components/ui/StyledButton";
import { AppScreens, AuthScreenProps } from "$configs/routes";
import { signIn } from "$contexts/auth/auth.reducer";
import useAuth from "$hooks/useAuth";
import { AUTH_MESSAGES } from "$utils/constant";
import { teddyChecking, teddyHandsUp } from "$utils/rive";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { RiveRef } from "rive-react-native";
import { getMe, login } from "src/apis/user.api";
import { z } from "zod";

export type LoginFormType = z.infer<typeof loginSchema>;
const loginFormDefaultValues: LoginFormType = {
    phone: "",
    password: "",
};

type LoginScreenNavigationType =
    AuthScreenProps<AppScreens.LoginScreen>["navigation"];

const LoginScreen = () => {
    const { dispatch } = useAuth();
    const riveRef = React.useRef<RiveRef>(null);
    const navigation = useNavigation<LoginScreenNavigationType>();
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
        navigation.navigate(AppScreens.ForgotPasswordScreen);
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center p-4">
                <AuthForm title="Welcome back" riveRef={riveRef}>
                    <Text className="text-gray-700">Tài khoản</Text>
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className=""
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
                    <HelperText
                        type="error"
                        visible={errors.phone ? true : false}
                    >
                        {errors.phone?.message}
                    </HelperText>
                    <Text className=" text-gray-700">Mật khẩu</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Mật khẩu"
                                className=""
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
                    <HelperText
                        type="error"
                        visible={errors.password ? true : false}
                    >
                        {errors.password?.message}
                    </HelperText>
                    <View className="flex-row justify-between items-center">
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
                </AuthForm>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

// TODO:  Authorization just shipper can login
