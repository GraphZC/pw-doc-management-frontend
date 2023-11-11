import axios from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import billQueryKeys from "./billQueryKeys";

const issueReceipt = async (id: string) => {
    const session = await getSession();
    console.log(session?.accessToken)
    const { data } = await axios.post(`/bill/${id}/receipt`, {}, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
}

const useIssueReceipt = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: issueReceipt,
        onSuccess: () =>{
            toast.success("ออกใบเสร็จเรียบร้อย");
        },
        onMutate: async () =>{
            queryClient.cancelQueries({
                queryKey: billQueryKeys.all
            })
        },
        onError: (err, updateData, context) =>{
            toast.error("เกิดข้อผิดพลาดในการออกใบเสร็จ");
        },
        onSettled: () => queryClient.invalidateQueries({
            queryKey: billQueryKeys.all
        }),
    });
};

export default useIssueReceipt;