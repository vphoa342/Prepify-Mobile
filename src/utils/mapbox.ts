import { MapBoxConfig } from "$configs/mapbox";
import GeocodeCache from "./geocode-cache";

const geocodeCache = GeocodeCache.getInstance();

export const convertAddressToCoordinates = async (address: string) => {
    if (geocodeCache.has(address)) {
        return geocodeCache.get(address);
    }

    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
        )}.json?access_token=${MapBoxConfig.API_KEY}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        const coordinates: [number, number] = [
            longitude as number,
            latitude as number,
        ];
        geocodeCache.set(address, coordinates);
        return coordinates;
    } else {
        console.log("No results found");
        return null;
    }
};
