import { Product } from "@/interface/product";
import axios from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import productQueryKeys from "./productQueryKeys";


const getOneProduct = async (id: string) => {
    const session = await getSession();

    const { data } = await axios.get<Product>(`/product/${id}`, {
        headers: {
            // Authorization: `Bearer ${session?.accessToken}`,
        }
    });
    return data;
};

const useOneProduct = (id: string) => {
    return useQuery({
        queryKey: productQueryKeys.detail(id),
        queryFn: () => getOneProduct(id),
    })
};

export default useOneProduct;

