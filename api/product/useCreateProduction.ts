import { Product } from "@/interface/product";
import axios from "@/lib/axios.config";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import productQueryKeys from "./productQueryKeys";

const createProduct = async (newData: Product) =>{
    const session = await getSession();
    const {data} = await axios.post<Product>("/product/", newData, {
        headers: {
            // Authorization: `Bearer ${session?.accessToken}`,
        },
    });

    return data;
};

const useCreateCustomer = () =>{
    const querClient = new QueryClient();

    return useMutation({
        mutationFn: createProduct,
        onMutate: async (data) =>{
            await querClient.cancelQueries({
                queryKey: productQueryKeys.all
            });
            querClient.setQueryData(productQueryKeys.all, (oldData: Product[] | undefined) =>{
                return [...oldData!, data];
            });
        },
    });
}
export default useCreateCustomer;
