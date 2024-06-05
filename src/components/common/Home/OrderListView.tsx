import { View } from "react-native";
import React from "react";
import { Button, Text, useTheme } from "react-native-paper";
import OrderCard from "./OrderCard";
import { Order } from "$types/order.type";
import { Role } from "$types/user.type";

const OrderListView = () => {
    const theme = useTheme();

    const orders: Order[] = [
        {
            id: "1234568",
            phone: "0943617015",
            status: "dang giao",
            datetime: new Date(),
            address:
                "S10.05 Vinhomes Grand Park, Phường Long Thạnh Mỹ, TP Thủ Đức, TP HCM",
            totalPrice: 100000,
            area: { id: "1", name: "Quận 9", price: 10000 },
            customer: {
                id: "1",
                user: {
                    id: "1",
                    email: "vphoa34@gmail.com",
                    fullname: "Ngoc Han",
                    role: Role.CUSTOMER,
                    avatar: null,
                    area: null,
                    address: null,
                    dateOfBirth: null,
                    phone: null,
                },
            },
        },
        {
            id: "1234568",
            phone: "0943617015",
            status: "dang giao",
            datetime: new Date(),
            address:
                "S10.05 Vinhomes Grand Park, Phường Long Thạnh Mỹ, TP Thủ Đức, TP HCM",
            totalPrice: 100000,
            area: { id: "1", name: "Quận 9", price: 10000 },
            customer: {
                id: "1",
                user: {
                    id: "1",
                    email: "vphoa34@gmail.com",
                    fullname: "Ngoc Han",
                    role: Role.CUSTOMER,
                    avatar: null,
                    area: null,
                    address: null,
                    dateOfBirth: null,
                    phone: null,
                },
            },
        },
    ];

    return (
        <View className="flex flex-col mt-4 h-full">
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row">
                    <Text className="text-xl not-italic font-extrabold leading-6 tracking-[-0.24px] ">
                        Đơn hàng mới
                    </Text>
                    <Text
                        className="ml-2 rounded-[50px] p-1"
                        style={{ backgroundColor: theme.colors.primary }}
                    >
                        12
                    </Text>
                </View>
                <Button
                    mode="elevated"
                    className="min-h-[14px]"
                    style={{ alignSelf: "flex-start" }}
                    contentStyle={{ height: 40, width: 150, padding: 0 }}
                    labelStyle={{ fontSize: 10 }}
                >
                    Bắt đầu giao hàng
                </Button>
            </View>
            <View className="flex flex-col justify-between mt-2">
                {orders.map((order) => (
                    <OrderCard order={order} isActionShown={false} />
                ))}
            </View>
        </View>
    );
};

export default OrderListView;
