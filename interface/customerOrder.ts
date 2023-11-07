import { Customer } from "./customer";
import { Employee } from "./employee";
import { Invoice } from "./invoice";
import { Purchase } from "./purchase";

export interface CustomerOrder{
    id?: string;
    customerId: string;
    customer?: Customer;
    employeeId: string;
    employee?: Employee;
    invoiceId?: string;
    invoice?: Invoice;
    purchase?: Purchase[];
    createdAt?: Date;
    updatedAt?: Date;
}