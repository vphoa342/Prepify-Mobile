import { Pressable, View } from "react-native";
import { Avatar, Button, Text, useTheme } from "react-native-paper";
import React from "react";

interface WelcomeCardProps {
    userName: string;
    onAvatarPress: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ ...props }) => {
    const theme = useTheme();
    const { userName, onAvatarPress } = props;
    return (
        <View className="flex flex-row min-h-10 items-center">
            {/* <Button className="p-0" onPress={onAvatarPress}> */}
            <Pressable onPress={onAvatarPress}>
                <Avatar.Text className="mr-3" size={52} label="XD" />
            </Pressable>
            {/* </Button> */}
            <Text className=" text-[color:var(--text-text-primary,#18181B)] text-xl not-italic font-extrabold leading-6 tracking-[-0.24px];">
                Hello,{" "}
                <Text
                    style={{ color: theme.colors.primary }}
                    className=" text-xl not-italic font-extrabold leading-6 tracking-[-0.24px];"
                >
                    {userName}
                </Text>
            </Text>
        </View>
    );
};

export default WelcomeCard;
