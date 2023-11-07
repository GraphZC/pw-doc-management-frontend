import { CustomerOrder } from "./CustomerOrder";
import { Pool } from "./Pool";
import { Product } from "./Product";

export interface Purchase{
    id?: string;
    poolId?: string;
    pool?: Pool;
    productId?: string;
    product?: Product;
    customerId?: string;
    customerOrder?: CustomerOrder;
    quantity?: number;
    createdAt?: Date;
    updatedAt?: Date;
}