import { Employee } from "@/interface/Employee";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import employeeQueryKeys from "./employeeQueryKeys";
import { toast } from "react-toastify";

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
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: employeeQueryKeys.all
            });
            toast.success("ลบข้อมูลพนักงานเรียบร้อยแล้ว");
        },
        onSettled: () => queryClient.invalidateQueries({
            queryKey: employeeQueryKeys.all
        }),
        onError: () => {
            toast.error("เกิดข้อผิดพลาดในการลบข้อมูลพนักงาน");
        }
    });
};
export default useDeleteEmployee;