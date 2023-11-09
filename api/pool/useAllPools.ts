import { Pool } from "@/interface/Pool";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import poolQueryKeys from "./poolQueryKeys";

const getAllPools = async() =>{
    const session = await getSession();

    const{data} = await axios.get<Pool[]>("/pool/", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },

    });
    return data;
};

const usePool = () =>{
    return useQuery({
        queryKey: poolQueryKeys.all,
        queryFn: getAllPools,
    })
};
export default usePool;