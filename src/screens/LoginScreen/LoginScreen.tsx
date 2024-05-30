import { Role, User } from "$types/user.type";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "src/contexts/auth/AuthContext";
import { signIn } from "src/contexts/auth/auth.reducer";

const Login = () => {
    const [phone, setPhone] = React.useState("");
    const [password, setPassword] = React.useState("");
    const theme = useTheme();

    const { dispatch } = useContext(AuthContext);

    const handleLogin = () => {
        // Handle normal login
        const user: User = {
            id: "1",
            fullname: "John Doe",
            email: "vphoa34@gmail.com",
            phone: "0123456789",
            role: Role.SHIPPER,
            avatar: null,
            area: null,
            address: null,
            dateOfBirth: null,
        };
        dispatch(signIn({ isAuthenticated: true, user: user }));
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
                <TextInput
                    className="mb-4"
                    label="Số điện thoại"
                    value={phone}
                    textContentType="telephoneNumber"
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
                <Text className="mb-2 text-gray-700">Mật khẩu</Text>
                <TextInput
                    label="Mật khẩu"
                    className="mb-4"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <View className="flex-row justify-between items-center mb-4">
                    <Button
                        className="flex-1"
                        mode="contained"
                        onPress={handleLogin}
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
