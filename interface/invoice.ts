import { CustomerOrder } from "./customerOrder";

export interface Invoice{
    id?: string;
    customerOrder?: CustomerOrder;
    paidAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}