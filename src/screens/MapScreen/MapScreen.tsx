import { MapBoxConfig } from "$configs/mapbox";
import useLocation from "$hooks/useLocation";
import Mapbox from "@rnmapbox/maps";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import NearestOrdersBlurView from "./components/NearestOrdersBlurView";
import { MapScreenProvider } from "./context/MapScreenContext";

Mapbox.setAccessToken(MapBoxConfig.API_KEY || "");

const WrappedMapScreen = () => {
    const location = useLocation();

    if (!location) {
        return (
            <View className="container">
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 relative">
            <Mapbox.MapView style={[{ flex: 1 }, StyleSheet.absoluteFill]}>
                <Mapbox.Camera
                    zoomLevel={20} // Adjust the zoom level as needed
                    centerCoordinate={
                        location
                            ? [location?.longitude, location?.latitude]
                            : [106.6297, 10.8231]
                    } // Coordinates for Ho Chi Minh City
                    pitch={45} // Optional: Adjust the pitch if needed
                    animationMode="flyTo"
                    animationDuration={3000} // Optional: Adjust the animation duration
                />

                {location && (
                    <Mapbox.PointAnnotation
                        coordinate={[location.longitude, location.latitude]}
                        id="currentLocation"
                    >
                        <Icon source="navigation" size={50} color="blue" />
                    </Mapbox.PointAnnotation>
                )}
            </Mapbox.MapView>
            <NearestOrdersBlurView />
        </SafeAreaView>
    );
};

const MapScreen = () => {
    return (
        <MapScreenProvider>
            <WrappedMapScreen />
        </MapScreenProvider>
    );
};

export default MapScreen;
