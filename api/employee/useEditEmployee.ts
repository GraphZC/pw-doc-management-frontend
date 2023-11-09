import { Employee } from "@/interface/Employee";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import employeeQueryKeys from "./employeeQueryKeys";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";

const editEmployee = async(editData: Employee) =>{
    const session = await getSession();
    const {data} = await axios.put<Employee>(`/employee/${editData.id}`, {
        name: editData.name,
        user: editData.username,
        password: editData.password ? editData.password : undefined,
        roles: editData.role,
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
            toast.success("แก้ไขข้อมูลพนักงานเรียบร้อยแล้ว");
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
            toast.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูลพนักงาน");
        },
    });
};

export default useEditEmployee;
