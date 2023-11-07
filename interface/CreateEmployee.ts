export interface Employee{
    id?:string;
    username?:string;
    password?:string;
    confirm_password?:string;
    name?:string;
    role?: EmployeeRole;
}
