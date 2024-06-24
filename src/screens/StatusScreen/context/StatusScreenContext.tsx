import React, { createContext, PropsWithChildren, useReducer } from "react";
import {
    StatusScreenContextType,
    StatusScreenState,
} from "./status-context.type";
import statusScreenReducerHandler from "./status-screen.reducer";
import { OrderStatus } from "$types/order.type";

const initialState: StatusScreenState = {
    isReportDialogVisible: false,
    isCanceledDialogVisible: false,
    isDeliveredDialogVisible: false,
    isDelayedDialogVisible: false,
    isUploadImageDialogVisible: false,
    orderStatus: OrderStatus.DELIVERING,
    orders: [],
    images: [],
};

const StatusScreenContext = createContext<StatusScreenContextType>({
    ...initialState,
    dispatch: () => null,
});

const StatusScreenProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(
        statusScreenReducerHandler,
        initialState
    );

    return (
        <StatusScreenContext.Provider value={{ ...state, dispatch }}>
            {children}
        </StatusScreenContext.Provider>
    );
};

export { StatusScreenContext, StatusScreenProvider };
