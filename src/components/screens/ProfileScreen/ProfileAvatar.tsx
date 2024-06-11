import { Avatar, Text } from "react-native-paper";
import React from "react";
import { View } from "react-native";

const ProfileAvatar = () => {
    return (
        <View className="w-full flex items-center justify-center">
            <Avatar.Image
                size={100}
                source={{ uri: "https://i.pravatar.cc/100" }}
            />
            <Text className="text-xl font-bold mt-1">Nguyễn Văn A</Text>
            <Text className="text-gray-500">ID: #123456</Text>
        </View>
    );
};

export default ProfileAvatar;
