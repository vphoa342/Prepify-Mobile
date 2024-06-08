import { View } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";
import React from "react";

interface WelcomeCardProps {
    userName: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ ...props }) => {
    const theme = useTheme();
    const { userName } = props;
    return (
        <View className="flex flex-row min-h-10 items-center">
            <Avatar.Text className="mr-3" size={52} label="XD" />
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
