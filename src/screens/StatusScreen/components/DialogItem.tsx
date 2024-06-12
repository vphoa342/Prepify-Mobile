import { View } from "react-native";
import { Divider, Text, TextInput } from "react-native-paper";
import React from "react";

const DialogItem = () => {
    return (
        <View className="mt-4 w-full">
            <Text className="font-bold">IDShipper.District.PhoneCustomer</Text>
            <View className="flex-row flex-wrap justify-center items-start w-full">
                <View className="w-1/5">
                    <Text className="text-left font-bold">KH:</Text>
                </View>
                <View className="w-4/5">
                    <Text className="text-left">Ngọc Hân/091***3586</Text>
                </View>
                <View className="w-1/5">
                    <Text className="text-left font-bold">Địa chỉ:</Text>
                </View>
                <View className="w-4/5">
                    <Text className="text-left">
                        S10.05 Vinhomes Grand Park, Phường Long Thạnh Mỹ, TP.
                        Thủ Đức, TP. HCM{" "}
                    </Text>
                </View>
            </View>
            <Divider className="mb-2 mt-2" />
            <View className="flex flex-col">
                <Text className="font-bold">Ghi chú:</Text>
                <TextInput
                    mode="flat"
                    multiline={true}
                    numberOfLines={3}
                    contentStyle={{ fontSize: 12, lineHeight: 14 }}
                    placeholder="Nhập ghi chú ở đây..."
                />
            </View>
        </View>
    );
};

export default DialogItem;
