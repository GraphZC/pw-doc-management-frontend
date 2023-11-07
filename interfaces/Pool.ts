import PoolType from "@/enum/PoolType";
import { Customer } from "./Customer";
import { ServiceDay } from "./ServiceDay";
import { Purchase } from "./Purchase";

export interface Pool {
    id?: string;
    customerId: string;
    customer?: Customer;
    purchaseId?: string;
    purchase?: Purchase[];
    address?: string;
    price?: number;
    chemicalIncluded?: boolean;
    type?: PoolType;
    inService?: boolean;
    serviceDayId?: string;
    serviceDay?: ServiceDay;
    createdAt?: Date;
    updatedAt?: Date;

}