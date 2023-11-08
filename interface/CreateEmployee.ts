import { EmployeeRole } from "@/enum/EmployeeRole";

export interface CreateEmployee{
    id?:string;
    username?:string;
    password?:string;
    confirmPassword?:string;
    name?:string;
    role?: EmployeeRole;
}
