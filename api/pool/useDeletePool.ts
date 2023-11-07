import { Pool } from "@/interface/Pool";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import poolQueryKeys from "./poolQueryKeys";

const useDeletePool = () =>{
    const queryClient = useQueryClient();

    const deletePool = async (id: string) => {
        const session = await getSession();
        const {data} = await axios.delete<Pool>(`/pool/${id}`,{
            headers:{
                Authorization: `Bearer ${session?.accessToken}`,
            }
        });
        return data;
    }
    return useMutation({
        mutationFn: deletePool,
        onMutate:async () => {
           await queryClient.cancelQueries({
            queryKey: poolQueryKeys.all
           });
        },
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: poolQueryKeys.all
        }),
        onSettled: () => queryClient.invalidateQueries({
            queryKey: poolQueryKeys.all
        }),
    });
};
export default useDeletePool;
