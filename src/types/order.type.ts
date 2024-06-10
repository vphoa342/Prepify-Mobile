import { Area } from "./area.type";
import { Customer } from "./customer.type";

export enum OrderStatus {
    DELAYED = "DELAYED",
    DELIVERING = "DELIVERING",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}

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
