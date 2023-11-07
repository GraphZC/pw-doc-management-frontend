import { Purchase } from "./Purchase";

export interface Product{
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    unit?: string;
    purchase: Purchase[];
    createdAt?: Date;
    updatedAt?: Date;
}