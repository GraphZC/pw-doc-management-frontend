import { Customer } from "./Customer";
import { Employee } from "./Employee";
import { Invoice } from "./Invoice";
import { Purchase } from "./Purchase";

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