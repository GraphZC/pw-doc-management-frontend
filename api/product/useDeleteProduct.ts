import { Product } from "@/interface/product";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react";
import productQueryKeys from "./productQueryKeys";

const useDeleteProduct = () =>{
    const queryClient = useQueryClient();

    const deleteProduct = async (id: string) => {
        const session = await getSession();
        const {data} = await axios.delete<Product>(`/product/${id}`,{
            headers:{
                Authorization: `Bearer ${session?.accessToken}`,
            }
        });
        return data;
    }
    return useMutation({
        mutationFn: deleteProduct,
        onMutate:async () => {
           await queryClient.cancelQueries({
            queryKey: productQueryKeys.all
           });
        },
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: productQueryKeys.all
        }),
        onSettled: () => queryClient.invalidateQueries({
            queryKey: productQueryKeys.all
        }),
    });
};
export default useDeleteProduct;
