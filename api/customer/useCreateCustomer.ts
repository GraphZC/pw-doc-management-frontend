import { Customer } from "@/interface/Customer";
import axios from "@/lib/axios.config";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import customerQueryKeys from "./customerQueryKeys";

const createCustomer = async (newCustomer: Customer) => {
    const session = await getSession();

    const { data, status } = await axios.post<Customer>("/customer/", newCustomer, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });

    return data;
};

const useCreateCustomer = () => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: createCustomer,
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: customerQueryKeys.all
            });
        },
        onSuccess: async (data) => {
            await queryClient.cancelQueries({
                queryKey: customerQueryKeys.all
            });
            queryClient.setQueryData(customerQueryKeys.all, (oldData: Customer[] | undefined) => {
                return [...oldData!, data];
            });
        },
    });
}

export default useCreateCustomer;