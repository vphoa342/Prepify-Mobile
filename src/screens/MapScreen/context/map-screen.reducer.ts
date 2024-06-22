import {
    MapScreenActionType,
    MapScreenPayloadAction,
    MapScreenState,
} from "./map-context.type";

const mapScreenReducerHandler = (
    state: MapScreenState,
    { type, payload }: MapScreenPayloadAction<MapScreenState>
) => {
    switch (type) {
        case MapScreenActionType.TOGGLE_SHOW_MORE:
            return {
                ...state,
                isShowMore: !state.isShowMore,
            };
        case MapScreenActionType.SET_NEAREST_ORDERS:
            return {
                ...state,
                nearestOrders: payload.nearestOrders,
            };
        default:
            return state;
    }
};

export default mapScreenReducerHandler;
