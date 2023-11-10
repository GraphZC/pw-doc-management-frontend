import { CustomerOrder } from "@/interface/CustomerOrder";
import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import billQueryKeys from "./billQueryKeys";
import { Customer } from "@/interface/Customer";
import { toast } from "react-toastify";

const createBill = async (newBill: CustomerOrder) => {
    const session = await getSession();

    const { data } = await axios.post<CustomerOrder>("/bill/", newBill, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });

    return data;
};

const useCreateBill = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBill,
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: billQueryKeys.all
            });
        },
        onSuccess: async (data) => {
            await queryClient.cancelQueries({
                queryKey: billQueryKeys.all
            });
            queryClient.setQueryData(billQueryKeys.all, (oldData: Customer[] | undefined) => {
                return [...oldData!, data];
            });
            toast.success("เพิ่มข้อมูลสำเร็จแล้ว");
        },
        onError: () => {
            toast.error("เพิ่มข้อมูลไม่สำเร็จ");
        }
    });
}

export default useCreateBill;