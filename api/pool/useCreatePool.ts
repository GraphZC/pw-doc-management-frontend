import { Pool } from "@/interface/pool";
import axios from "@/lib/axios.config";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import poolQueryKeys from "./poolQueryKeys";

const createPool = async (newPool: Pool) => {
    const session = await getSession();

    const { data, status } = await axios.post<Pool>("/pool/", newPool, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });

    return data;
};

const useCreatePool = () => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: createPool,
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: poolQueryKeys.all
            });
        },
        onSuccess: async (data) => {
            await queryClient.cancelQueries({
                queryKey: poolQueryKeys.all
            });
            queryClient.setQueryData(poolQueryKeys.all, (oldData: Pool[] | undefined) => {
                return [...oldData!, data];
            });
        },
    });
}

export default useCreatePool;
