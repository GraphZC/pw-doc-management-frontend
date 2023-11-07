import { CustomerOrder } from "./CustomerOrder";
import { Pool } from "./Pool";

export interface Customer{
    id?: string;
    name?: string;
    address?: string;
    telephone?: string;
    taxId?: string;
    pool?: Pool[];
    customerOrder?: CustomerOrder[];
    createdAt?: Date;
    updatedAt?: Date;
}