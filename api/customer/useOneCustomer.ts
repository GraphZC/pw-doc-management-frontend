import { Customer } from "@/interface/customer";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import customerQueryKeys from "./customerQueryKeys";


const getOneCustomer = async (id: string) => {
    const session = await getSession();

    const { data } = await axios.get<Customer>(`/customer/${id}`, {
        headers: {
            // Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useOneCustomer = (id: string) => {
    return useQuery({
        queryKey: customerQueryKeys.detial(id),
        queryFn: () => getOneCustomer(id),
    })
};

export default useOneCustomer;