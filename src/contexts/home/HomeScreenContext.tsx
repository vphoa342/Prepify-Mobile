import { Order } from "$types/order.type";
import { Dispatch } from "react";

export enum HomeScreenActionType {
    SET_ORDERS = "SET_ORDERS",
    PRESS_AVATAR = "PRESS_AVATAR",
}

interface HomeScreenState {
    orders: Order[];
}

const homeScreenInitialState: HomeScreenState = {
    orders: [],
};

export interface PayloadAction<T> {
    type: HomeScreenActionType;
    payload: T;
}

interface HomeScreenContextType extends HomeScreenState {
    dispatch: Dispatch<PayloadAction<HomeScreenState>>;
}
