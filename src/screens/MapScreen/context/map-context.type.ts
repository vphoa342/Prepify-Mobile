import { Order } from "$types/order.type";
import { Dispatch } from "react";

export interface MapScreenState {
    isShowMore?: boolean;
    nearestOrders?: Order[];
}

export enum MapScreenActionType {
    TOGGLE_SHOW_MORE = "TOGGLE_SHOW_MORE",
    SET_NEAREST_ORDERS = "SET_NEAREST_ORDERS",
}

export interface MapScreenPayloadAction<T> {
    type: MapScreenActionType;
    payload: T;
}

export interface MapScreenContextType extends MapScreenState {
    dispatch: Dispatch<MapScreenPayloadAction<MapScreenState>>;
}
