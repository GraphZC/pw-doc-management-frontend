import { Product } from "@/interface/Product";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import productQueryKeys from "./productQueryKeys";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";

const editProduct = async(editData: Product) =>{
    const session = await getSession();
    const {data} = await axios.put<Product>(`/product/${editData.id}`, {
        code: editData.code,
        name: editData.name,
        description: editData.description,
        price: editData.price,
        unit: editData.unit,
    }, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
}

const useEditProduct = () =>{
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: editProduct,
        onSuccess: () =>{
            toast.success("Product edited successfully");
        },
        onMutate: async (updateData: Product) =>{
            await queryClient.cancelQueries({
                queryKey: productQueryKeys.detail(updateData.id?.toString()!),
            });
            const previousData = queryClient.getQueryData<Product>(productQueryKeys.detail(updateData.id?.toString()!));
            queryClient.setQueryData<Product>(productQueryKeys.detail(updateData.id?.toString()!), updateData);
            return {previousData, updateData};
        },
        onError: (err, updateData, context) =>{
            queryClient.setQueryData<Product>(productQueryKeys.detail(updateData.id?.toString()!), context?.previousData);
        },
    });
};

export default useEditProduct;

