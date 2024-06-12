import {
    StatusScreenActionType,
    StatusScreenPayloadAction,
    StatusScreenState,
} from "./status-context.type";

const statusScreenReducerHandler = (
    state: StatusScreenState,
    { type, payload }: StatusScreenPayloadAction<StatusScreenState>
) => {
    switch (type) {
        case StatusScreenActionType.SHOW_REPORT_DIALOG:
            return {
                ...state,
                isReportDialogVisible: true,
            };
        case StatusScreenActionType.HIDE_REPORT_DIALOG:
            return {
                ...state,
                isReportDialogVisible: false,
            };
        case StatusScreenActionType.SET_ORDER_STATUS:
            return {
                ...state,
                orderStatus: payload.orderStatus,
            };
        case StatusScreenActionType.SHOW_DELIVERED_DIALOG:
            return {
                ...state,
                isDeliveredDialogVisible: true,
            };
        case StatusScreenActionType.HIDE_DELIVERED_DIALOG:
            return {
                ...state,
                isDeliveredDialogVisible: false,
            };
        case StatusScreenActionType.SHOW_DELAYED_DIALOG:
            return {
                ...state,
                isDelayedDialogVisible: true,
            };
        case StatusScreenActionType.HIDE_DELAYED_DIALOG:
            return {
                ...state,
                isDelayedDialogVisible: false,
            };
        case StatusScreenActionType.SHOW_CANCELED_DIALOG:
            return {
                ...state,
                isCanceledDialogVisible: true,
            };
        case StatusScreenActionType.HIDE_CANCELED_DIALOG:
            return {
                ...state,
                isCanceledDialogVisible: false,
            };
        default:
            return state;
    }
};

export default statusScreenReducerHandler;
