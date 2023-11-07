import { Product } from "@/interface/product";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react"
import productQueryKeys from "./productQueryKeys";

const getAllProducts = async() =>{
    const session = await getSession();

    const{data} = await axios.get<Product[]>("/product/", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },

    });
    return data;
};

const useProduct = () =>{
    return useQuery({
        queryKey: productQueryKeys.all,
        queryFn: getAllProducts,
    })
};
export default useProduct;
