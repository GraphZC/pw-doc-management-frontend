import PoolType from "@/enum/PoolType";
import { Customer } from "./customer";
import { ServiceDay } from "./serviceDay";
import { Purchase } from "./purchase";

export interface Pool{
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