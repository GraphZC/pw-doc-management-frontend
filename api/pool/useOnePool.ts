import { Pool } from "@/interface/Pool";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import poolQueryKeys from "./poolQueryKeys";


const getOnePool = async (id: string) => {
    const session = await getSession();

    const { data } = await axios.get<Pool>(`/pool/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useOnePool = (id: string) => {
    return useQuery({
        queryKey: poolQueryKeys.detail(id),
        queryFn: () => getOnePool(id),
    })
};

export default useOnePool;

