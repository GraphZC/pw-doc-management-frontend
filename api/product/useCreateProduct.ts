import { Product } from "@/interface/Product";
import axios from "@/lib/axios.config";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import productQueryKeys from "./productQueryKeys";

const createProduct = async (newProduct: Product) => {
    const session = await getSession();
    newProduct.price = Number(newProduct.price);
    const { data, status } = await axios.post<Product>("/product/", newProduct, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    });

    return data;
};

const useCreateProduct = () => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: createProduct,
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: productQueryKeys.all
            });
        },
        onSuccess: async (data) => {
            await queryClient.cancelQueries({
                queryKey: productQueryKeys.all
            });
            queryClient.setQueryData(productQueryKeys.all, (oldData: Product[] | undefined) => {
                return [...oldData!, data];
            });
        },
    });
}

export default useCreateProduct;