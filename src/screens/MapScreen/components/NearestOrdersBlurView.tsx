import { BlurView } from "expo-blur";
import { MapPinIcon } from "lucide-react-native";
import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Paragraph, Text, Title } from "react-native-paper";
import { MapScreenContext } from "../context/MapScreenContext";
import { MapScreenActionType } from "../context/map-context.type";

const NearestOrdersBlurView = () => {
    const { nearestOrders, isShowMore, dispatch } =
        useContext(MapScreenContext);

    const toggleShowMore = () => {
        dispatch({
            type: MapScreenActionType.TOGGLE_SHOW_MORE,
            payload: {},
        });
    };

    return (
        <BlurView intensity={80} tint="light" style={styles.blurContainer}>
            <Title>Đơn hàng gần đây</Title>
            {nearestOrders &&
                nearestOrders.map((point) => (
                    <View
                        key={point.id}
                        className="flex flex-row items-center justify-between"
                    >
                        <View className="flex flex-row items-center">
                            <View>
                                <MapPinIcon size={24} color={"black"} />
                            </View>
                            <View className="ml-2">
                                <Text>{point.customer.user.fullname}</Text>
                                <Paragraph>{point.address}</Paragraph>
                            </View>
                        </View>
                        <View>
                            <Text>0.05km</Text>
                        </View>
                    </View>
                ))}
            <View className="w-full items-center mt-2">
                {isShowMore ? (
                    <Pressable onPress={() => toggleShowMore()}>
                        <Text>Show less</Text>
                    </Pressable>
                ) : (
                    <Pressable onPress={() => toggleShowMore()}>
                        <Text>Show more</Text>
                    </Pressable>
                )}
            </View>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    blurContainer: {
        flex: 1,
        padding: 20,
        margin: 16,
        textAlign: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 20,
        height: "auto",
        position: "absolute",
        left: 0,
        bottom: 40,
        right: 0,
    },
});

export default NearestOrdersBlurView;
