import { Customer } from "@/interface/customer";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import customerQueryKeys from "./customerQueryKeys";

const useDeleteCustomer = () =>{
    const queryClient = useQueryClient();

    const deleteCustomer = async (id: string) => {
        const session = await getSession();
        const {data} = await axios.delete<Customer>(`/customer/${id}`,{
            headers:{
                // Authorization: `Bearer ${session?.accessToken}`,
            }
        });
        return data;
    }
    return useMutation({
        mutationFn: deleteCustomer,
        onMutate:async () => {
           await queryClient.cancelQueries({
            queryKey: customerQueryKeys.all
           });
        },
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: customerQueryKeys.all
        }),
        onSettled: () => queryClient.invalidateQueries({
            queryKey: customerQueryKeys.all
        }),
    });
};
export default useDeleteCustomer;