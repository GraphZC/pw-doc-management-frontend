import { Product } from "@/interface/product";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react"
import productQueryKeys from "./productQueryKeys";

const getAllCustomers = async() =>{
    const session = await getSession();

    const{data} = await axios.get<Product[]>("/product/", {
        headers: {
            // Authorization: `Bearer ${session?.accessToken}`,
        },

    });
    return data;
};

const useCustomer = () =>{
    return useQuery({
        queryKey: productQueryKeys.all,
        queryFn: getAllCustomers,
    })
};
export default useCustomer;
