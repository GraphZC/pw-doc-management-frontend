import { CustomerOrder } from "./CustomerOrder";

export interface Invoice{
    id?: string;
    customerOrder?: CustomerOrder;
    vatIncluded?: boolean;
    paidAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}