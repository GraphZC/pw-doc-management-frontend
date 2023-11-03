import { Customer } from "@/interface/customer";
import axios from "@/lib/axios.config";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import customerQueryKeys from "./customerQueryKeys";

const createCustomer  = async (newData: Customer) =>{
    const session = await getSession();
    const {data} = await axios.post<Customer>("/customer/", newData, {
        headers: {
            // Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    return data;
};

const useCreateCustomer = () =>{
    const querClient = new QueryClient();

    return useMutation({
        mutationFn: createCustomer,
        onMutate: async (data) =>{
            await querClient.cancelQueries({
                queryKey: customerQueryKeys.all
            });
            querClient.setQueryData(customerQueryKeys.all, (oldData: Customer[] | undefined) =>{
                return [...oldData!, data];
            });
        },
    });
}
export default useCreateCustomer;