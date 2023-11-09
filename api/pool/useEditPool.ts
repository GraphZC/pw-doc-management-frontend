import { Pool } from "@/interface/Pool";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import poolQueryKeys from "./poolQueryKeys";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";

const editPool = async(editData: Pool) =>{
    const session = await getSession();
    editData!.serviceDay!.monday = editData!.serviceDay!.monday ? true : false;
    editData!.serviceDay!.tuesday = editData!.serviceDay!.tuesday ? true : false;
    editData!.serviceDay!.wednesday = editData!.serviceDay!.wednesday ? true : false;
    editData!.serviceDay!.thursday = editData!.serviceDay!.thursday ? true : false;
    editData!.serviceDay!.friday = editData!.serviceDay!.friday ? true : false;
    editData!.serviceDay!.saturday = editData!.serviceDay!.saturday ? true : false;
    editData!.serviceDay!.sunday = editData!.serviceDay!.sunday ? true : false;

    const {data} = await axios.put<Pool>(`/pool/${editData.id}`, {
        ...editData,
        id: undefined,
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

