import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useLocation = () => {
    const [location, setLocation] =
        useState<Location.LocationObjectCoords | null>(null);

    useEffect(() => {
        (async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                console.error("Permission to access location was denied");

                return;
            }

            const { coords } = await Location.getCurrentPositionAsync({});

            setLocation(coords);
        })();
    }, []);

    return location;
};

export default useLocation;
