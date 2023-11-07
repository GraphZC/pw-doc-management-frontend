import { Pool } from "./Pool";

export interface ServiceDay{
    id?: string;
    pool?: Pool;
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}