import { OrderStatus } from "$types/order.type";
import * as React from "react";
import { StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

const StautsSegmentedButtons = ({
    orderStatus,
    onOrderStatus,
}: {
    orderStatus: string;
    onOrderStatus: (v: OrderStatus) => void;
}) => {
    return (
        <SegmentedButtons
            value={orderStatus}
            onValueChange={(e) => onOrderStatus(e as OrderStatus)}
            buttons={[
                {
                    value: OrderStatus.DELIVERING,
                    label: "Đang giao",
                    labelStyle: styles.btnLabel,
                },
                {
                    value: OrderStatus.DELIVERED,
                    label: "Hoàn thành",
                    labelStyle: styles.btnLabel,
                },
                {
                    value: OrderStatus.DELAYED,
                    label: "Bị hoãn",
                    labelStyle: styles.btnLabel,
                },
                {
                    value: OrderStatus.CANCELLED,
                    label: "Đã hủy",
                    labelStyle: styles.btnLabel,
                },
            ]}
            theme={{ roundness: 2 }}
        />
    );
};

const styles = StyleSheet.create({
    btnLabel: {
        fontSize: 10,
    },
});

export default StautsSegmentedButtons;
