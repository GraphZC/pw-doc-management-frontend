import { Employee } from "@/interface/employee";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import employeeQueryKeys from "./employeeQueryKeys";

const useDeleteEmployee = () =>{
    const queryClient = useQueryClient();

    const deleteEmployee = async (id: string) => {
        const session = await getSession();
        const {data} = await axios.delete<Employee>(`/employee/${id}`,{
            headers:{
                Authorization: `Bearer ${session?.accessToken}`,
            }
        });
        return data;
    }
    return useMutation({
        mutationFn: deleteEmployee,
        onMutate:async () => {
           await queryClient.cancelQueries({
            queryKey: employeeQueryKeys.all
           });
        },
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: employeeQueryKeys.all
        }),
        onSettled: () => queryClient.invalidateQueries({
            queryKey: employeeQueryKeys.all
        }),
    });
};
export default useDeleteEmployee;