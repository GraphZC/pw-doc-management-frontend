import { Customer } from "@/interface/customer";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customerQueryKeys from "./customerQueryKeys";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";

const editCustomer = async(editData: Customer) =>{
    const session = await getSession();
    const {data} = await axios.put<Customer>(`/customer/${editData.id}`, {
        name: editData.name,
        address: editData.address,
        telephone: editData.telephone,
        taxId: editData.taxId,
    }, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
}

const useEditCustomer = () =>{
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: editCustomer,
        onSuccess: () =>{
            toast.success("Customer edited successfully");
        },
        onMutate: async (updateData: Customer) =>{
            await queryClient.cancelQueries({
                queryKey: customerQueryKeys.detial(updateData.id?.toString()!),
            });
            const previousData = queryClient.getQueryData<Customer>(customerQueryKeys.detial(updateData.id?.toString()!));
            queryClient.setQueryData<Customer>(customerQueryKeys.detial(updateData.id?.toString()!), updateData);
            return {previousData, updateData};
        },
        onError: (err, updateData, context) =>{
            queryClient.setQueryData<Customer>(customerQueryKeys.detial(updateData.id?.toString()!), context?.previousData);
        },
    });
};

export default useEditCustomer;