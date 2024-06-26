import ProfileAvatar from "./components/ProfileAvatar";
import ProfileForm from "./components/ProfileForm";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
    return (
        <SafeAreaView className="flex-1 p-6">
            <ProfileAvatar />
            <ProfileForm />
        </SafeAreaView>
    );
};

export default ProfileScreen;
