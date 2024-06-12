import { Area } from "./area.type";
import { Customer } from "./customer.type";

export enum OrderStatus {
    DELIVERING = "DELIVERING",
    DELIVERED = "DELIVERED",
    DELAYED = "DELAYED",
    CANCELED = "CANCELED",
}

export const TitleMapping = {
    [OrderStatus.DELIVERING]: "Đang giao",
    [OrderStatus.DELIVERED]: "Hoàn thành",
    [OrderStatus.DELAYED]: "Bị hoãn",
    [OrderStatus.CANCELED]: "Đã hủy",
};

export interface Order {
    id: string;
    phone: string;
    feedback?: string;
    rate?: string;
    status: OrderStatus | string;
    datetime: Date | string;
    address: string;
    customer: Customer;
    totalPrice: number;
    area: Area;
    note?: string;
}
