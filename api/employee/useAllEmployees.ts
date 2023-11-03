import { Employee } from "@/interface/employee";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react"
import employeeQueryKeys from "./employeeQueryKeys";

const getAllCustomers = async() =>{
    const session = await getSession();

    const{data} = await axios.get<Employee[]>("/employee/", {
        headers: {
            // Authorization: `Bearer ${session?.accessToken}`,
        },

    });
    return data;
};

const useCustomer = () =>{
    return useQuery({
        queryKey: employeeQueryKeys.all,
        queryFn: getAllCustomers,
    })
};
export default useCustomer;