import { Employee } from "@/interface/employee";
import axios from "@/lib/axios.config";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import employeeQueryKeys from "./employeeQueryKeys";

const createEmployee = async (newData: Employee) =>{
    const session = await getSession();
    const {data} = await axios.post<Employee>("/employee/", newData, {
        headers: {
            // Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    return data;
};

const useCreateCustomer = () =>{
    const querClient = new QueryClient();

    return useMutation({
        mutationFn: createEmployee,
        onMutate: async (data) =>{
            await querClient.cancelQueries({
                queryKey: employeeQueryKeys.all
            });
            querClient.setQueryData(employeeQueryKeys.all, (oldData: Employee[] | undefined) =>{
                return [...oldData!, data];
            });
        },
    });
}
export default useCreateCustomer;