import React, { PropsWithChildren, createContext, useReducer } from "react";
import { MapScreenContextType, MapScreenState } from "./map-context.type";
import mapScreenReducerHandler from "./map-screen.reducer";

const initialState: MapScreenState = {
    isShowMore: false,
    nearestOrders: [],
};

const MapScreenContext = createContext<MapScreenContextType>({
    ...initialState,
    dispatch: () => null,
});

const MapScreenProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(mapScreenReducerHandler, initialState);

    return (
        <MapScreenContext.Provider value={{ ...state, dispatch }}>
            {children}
        </MapScreenContext.Provider>
    );
};

export { MapScreenContext, MapScreenProvider };
