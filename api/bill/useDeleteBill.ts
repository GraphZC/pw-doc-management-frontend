import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import billQueryKeys from "./billQueryKeys";

const DeleteBill = async (id: string) => {
    const session = await getSession();
    const { data } = await axios.delete(`/bill/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useDeleteBill = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: DeleteBill,
        onMutate:async () => {
            await queryClient.cancelQueries({
             queryKey: billQueryKeys.all
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                    queryKey: billQueryKeys.all
            });
            toast.success("ลบข้อมูลสำเร็จแล้ว");
        },
        onError: () => {
            toast.error("ลบข้อมูลไม่สำเร็จ");
        },
        onSettled: () => queryClient.invalidateQueries({
            queryKey: billQueryKeys.all
        }),
    });
}

export default useDeleteBill;