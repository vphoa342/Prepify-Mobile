import { OrderStatus } from "$types/order.type";
import { Dispatch } from "react";

export interface StatusScreenState {
    isReportDialogVisible?: boolean;
    isDeliveredDialogVisible?: boolean;
    isDelayedDialogVisible?: boolean;
    isCanceledDialogVisible?: boolean;
    orderStatus?: OrderStatus;
}

export enum StatusScreenActionType {
    SHOW_REPORT_DIALOG = "SHOW_REPORT_DIALOG",
    HIDE_REPORT_DIALOG = "HIDE_REPORT_DIALOG",
    SHOW_DELIVERED_DIALOG = "SHOW_DELIVERED_DIALOG",
    HIDE_DELIVERED_DIALOG = "HIDE_DELIVERED_DIALOG",
    SHOW_DELAYED_DIALOG = "SHOW_DELAYED_DIALOG",
    HIDE_DELAYED_DIALOG = "HIDE_DELAYED_DIALOG",
    SHOW_CANCELED_DIALOG = "SHOW_CANCELED_DIALOG",
    HIDE_CANCELED_DIALOG = "HIDE_CANCELED_DIALOG",
    SET_ORDER_STATUS = "SET_ORDER_STATUS",
}

export interface StatusScreenPayloadAction<T> {
    type: StatusScreenActionType;
    payload: T;
}

export interface StatusScreenContextType extends StatusScreenState {
    dispatch: Dispatch<StatusScreenPayloadAction<StatusScreenState>>;
}
