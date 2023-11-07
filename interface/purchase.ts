import { CustomerOrder } from "./customerOrder";
import { Pool } from "./pool";
import { Product } from "./product";

export interface Purchase{
    id?: string;
    poolId: string;
    pool?: Pool;
    productId: string;
    product?: Product;
    customerId: string;
    customerOrder?: CustomerOrder;
    quantity?: number;
    createdAt?: Date;
    updatedAt?: Date;
}