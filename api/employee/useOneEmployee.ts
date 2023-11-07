import { Employee } from "@/interface/employee";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import employeeQueryKeys from "./employeeQueryKeys";


const getOneEmployee = async (id: string) => {
    const session = await getSession();

    const { data } = await axios.get<Employee>(`/employee/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useOneEmployee = (id: string) => {
    return useQuery({
        queryKey: employeeQueryKeys.detail(id),
        queryFn: () => getOneEmployee(id),
    })
};

export default useOneEmployee;
