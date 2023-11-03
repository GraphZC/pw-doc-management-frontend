import { Employee } from "@/interface/employee";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react"
import employeeQueryKeys from "./employeeQueryKeys";

const getAllEmployees = async() =>{
    const session = await getSession();

    const{data} = await axios.get<Employee[]>("/employee/", {
        headers: {
            // Authorization: `Bearer ${session?.accessToken}`,
        },

    });
    return data;
};

const useEmployee = () =>{
    return useQuery({
        queryKey: employeeQueryKeys.all,
        queryFn: getAllEmployees,
    })
};
export default useEmployee;