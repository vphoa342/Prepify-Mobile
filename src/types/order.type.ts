import { Area } from "./area.type";
import { Customer } from "./customer.type";

export interface Order {
    id: string;
    phone: string;
    feedback?: string;
    rate?: string;
    status: string;
    datetime: Date;
    address: string;
    customer: Customer;
    totalPrice: number;
    area: Area;
}
