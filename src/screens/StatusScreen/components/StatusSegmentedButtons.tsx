import { OrderStatus, TitleMapping } from "$types/order.type";
import * as React from "react";
import { StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { StatusScreenContext } from "../context/StatusScreenContext";
import { StatusScreenActionType } from "../context/status-context.type";

const StautsSegmentedButtons = () => {
    const { orderStatus, dispatch } = React.useContext(StatusScreenContext);

    const buttons = Object.values(OrderStatus).map((status) => ({
        value: status,
        label: TitleMapping[status],
        labelStyle: styles.btnLabel,
    }));

    return (
        <SegmentedButtons
            value={orderStatus as string}
            onValueChange={(e) =>
                dispatch({
                    type: StatusScreenActionType.SET_ORDER_STATUS,
                    payload: { orderStatus: e as OrderStatus },
                })
            }
            buttons={buttons}
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
