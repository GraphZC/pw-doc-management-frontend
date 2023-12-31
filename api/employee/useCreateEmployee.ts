import { Employee } from "@/interface/Employee";
import axios from "@/lib/axios.config";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import employeeQueryKeys from "./employeeQueryKeys";
import { toast } from "react-toastify";

const createEmployee = async (newEmployee: Employee) => {
    const session = await getSession();

    const { data, status } = await axios.post<Employee>("/employee/", newEmployee, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });

    return data;
};

const useCreateEmployee = () => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: createEmployee,
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: employeeQueryKeys.all
            });
        },
        onSuccess: async (data) => {
            await queryClient.cancelQueries({
                queryKey: employeeQueryKeys.all
            });
            queryClient.setQueryData(employeeQueryKeys.all, (oldData: Employee[] | undefined) => {
                return [...oldData!, data];
            });
            toast.success("สร้างข้อมูลพนักงานเรียบร้อยแล้ว");
        },
        onError: (err, newEmployee, context) => {
            toast.error("เกิดข้อผิดพลาดในการสร้างข้อมูลพนักงาน");
        }
    });
}

export default useCreateEmployee;