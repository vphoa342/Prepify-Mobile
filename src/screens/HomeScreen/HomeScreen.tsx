import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "src/contexts/auth/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <SafeAreaView>
            <View>
                <Text>Welcome {user?.fullname}</Text>
            </View>
        </SafeAreaView>
    );
};

export default Home;
