import { loginSchema } from "$components/common/AuthForm/AuthForm.schema";
import { Role, User } from "$types/user.type";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "src/contexts/auth/AuthContext";
import { signIn } from "src/contexts/auth/auth.reducer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type LoginFormType = z.infer<typeof loginSchema>;
const loginFormDefaultValues: LoginFormType = {
    phone: "",
    password: "",
};

const Login = () => {
    const theme = useTheme();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: loginFormDefaultValues,
    });

    const { dispatch } = useContext(AuthContext);

    const handleLogin = (data: LoginFormType) => {
        console.log(data);
        // // Handle normal login
        // const user: User = {
        //     id: "1",
        //     fullname: "John Doe",
        //     email: "vphoa34@gmail.com",
        //     phone: "0123456789",
        //     role: Role.SHIPPER,
        //     avatar: null,
        //     area: null,
        //     address: null,
        //     dateOfBirth: null,
        // };
        // dispatch(signIn({ isAuthenticated: true, user: user }));
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
                            // value={phone}
                            // onChangeText={setPhone}
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
                            // placeholder="Mật khẩu"
                            secureTextEntry
                            // value={password}
                            // onChangeText={setPassword}
                            // secureTextEntry
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
                    Login with Google
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default Login;

// TODO: Change border of button
