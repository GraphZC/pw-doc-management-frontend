import { CustomerOrder } from "./customerOrder";
import { Pool } from "./pool";
import { Product } from "./product";

export interface Purchase{
    id?: string;
    pool?: Pool;
    product?: Product;
    customerOrder?: CustomerOrder;
    quantity?: number;
    createdAt?: Date;
    updatedAt?: Date;
}