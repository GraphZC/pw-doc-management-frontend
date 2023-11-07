import { Pool } from "@/interface/Pool";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import poolQueryKeys from "./poolQueryKeys";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";

const editPool = async(editData: Pool) =>{
    const session = await getSession();
    const {data} = await axios.put<Pool>(`/pool
/${editData.id}`, {
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

const useEditPool = () =>{
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: editPool,
        onSuccess: () =>{
            toast.success("Pool edited successfully");
        },
        onMutate: async (updateData: Pool) =>{
            await queryClient.cancelQueries({
                queryKey: poolQueryKeys.detail(updateData.id?.toString()!),
            });
            const previousData = queryClient.getQueryData<Pool>(poolQueryKeys.detail(updateData.id?.toString()!));
            queryClient.setQueryData<Pool>(poolQueryKeys.detail(updateData.id?.toString()!), updateData);
            return {previousData, updateData};
        },
        onError: (err, updateData, context) =>{
            queryClient.setQueryData<Pool>(poolQueryKeys.detail(updateData.id?.toString()!), context?.previousData);
        },
    });
};

export default useEditPool;

