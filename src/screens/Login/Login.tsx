import React from "react";
import { Text, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const theme = useTheme();

  const handleLogin = () => {
    // Handle normal login
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
        <TextInput
          className="mb-4"
          label="Phone"
          value={phone}
          textContentType="telephoneNumber"
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          label="Password"
          className="mb-4"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View className="flex-row justify-between items-center mb-4">
          <Button className="flex-1" mode="contained" onPress={handleLogin}>
            Login
          </Button>
          <Button className="ml-4" onPress={handleForgotPassword}>
            Forgot Password?
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
