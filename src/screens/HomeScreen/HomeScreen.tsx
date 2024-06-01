import { signOut } from "$contexts/auth/auth.reducer";
import useAuth from "$hooks/useAuth";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const { user, dispatch } = useAuth();

    const handleLogout = () => {
        dispatch(signOut());
    };

    return (
        <SafeAreaView>
            <View>
                <Text>Welcome {user?.fullname}</Text>
                <Button onPress={handleLogout}>Logout</Button>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
