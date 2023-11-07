import { Customer } from "./customer";
import { Employee } from "./employee";
import { Invoice } from "./invoice";
import { Purchase } from "./purchase";

export interface CustomerOrder{
    id?: string;
    customer?: Customer;
    employee?: Employee;
    invoice?: Invoice;
    purchase?: Purchase[];
    createdAt?: Date;
    updatedAt?: Date;
}