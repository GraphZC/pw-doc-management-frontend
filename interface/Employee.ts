import { EmployeeRole } from "@/enum/EmployeeRole";
import { CustomerOrder } from "./CustomerOrder";

export interface Employee{
    id?: string;
    username?: string;
    password?: string;
    name?: string;
    role?: EmployeeRole;
    customerOrder?: CustomerOrder[];
    createdAt?: Date;
    updatedAt?: Date;
}