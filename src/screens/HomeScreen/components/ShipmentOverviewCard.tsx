import { ArrowRight } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface ShipmentOverviewDedailProps {
    title: string;
    value: string;
}
const ShipmentOverviewDedail: React.FC<ShipmentOverviewDedailProps> = ({
    ...props
}) => {
    const { title, value } = props;
    return (
        <View className="flex flex-col items-center">
            <Text className="text-lg not-italic font-extrabold leading-6 tracking-[-0.216px];">
                {value}
            </Text>
            <Text className="text-xs not-italic font-normal leading-6 tracking-[-0.144px]">
                {title}
            </Text>
        </View>
    );
};

const ShipmentOverviewCard = () => {
    const theme = useTheme();
    return (
        <View className="mt-6">
            <View className="">
                <Text className="text-xl not-italic font-extrabold leading-6 tracking-[-0.24px]">
                    Tình trạng các đơn hàng
                </Text>
            </View>
            <View
                className="flex flex-row justify-between mt-4 px-5 py-3 rounded-xl"
                style={{ backgroundColor: theme.colors.primaryContainer }}
            >
                <ShipmentOverviewDedail title="Đang giao" value="03" />
                <ShipmentOverviewDedail title="Hoàn thành" value="20" />
                <ShipmentOverviewDedail title="Bị hoãn" value="01" />
                <ShipmentOverviewDedail title="Đã hủy" value="02" />
            </View>
            <View className="flex flex-row justify-end mt-2">
                <Text style={{ color: theme.colors.primary }}>
                    Xem chi tiết{" "}
                </Text>
                <ArrowRight size={24} color={theme.colors.primary} />
            </View>
        </View>
    );
};

export default ShipmentOverviewCard;
