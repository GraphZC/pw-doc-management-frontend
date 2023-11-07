import { Employee } from "@/interface/employee";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import employeeQueryKeys from "./employeeQueryKeys";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";

const editEmployee = async(editData: Employee) =>{
    const session = await getSession();
    const {data} = await axios.put<Employee>(`/employee/${editData.id}`, {
        password: editData.password,
        name: editData.name,
        roles: editData.roles,
    }, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
}

const useEditEmployee = () =>{
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: editEmployee,
        onSuccess: () =>{
            toast.success("Employee edited successfully");
        },
        onMutate: async (updateData: Employee) =>{
            await queryClient.cancelQueries({
                queryKey: employeeQueryKeys.detail(updateData.id?.toString()!),
            });
            const previousData = queryClient.getQueryData<Employee>(employeeQueryKeys.detail(updateData.id?.toString()!));
            queryClient.setQueryData<Employee>(employeeQueryKeys.detail(updateData.id?.toString()!), updateData);
            return {previousData, updateData};
        },
        onError: (err, updateData, context) =>{
            queryClient.setQueryData<Employee>(employeeQueryKeys.detail(updateData.id?.toString()!), context?.previousData);
        },
    });
};

export default useEditEmployee;
