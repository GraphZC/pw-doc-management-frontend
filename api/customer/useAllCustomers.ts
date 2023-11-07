import { Customer } from "@/interface/Customer";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react"
import customerQueryKeys from "./customerQueryKeys";

const getAllCustomers = async() =>{
    const session = await getSession();

    const{data} = await axios.get<Customer[]>("/customer/", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },

    });
    return data;
};

const useCustomer = () =>{
    return useQuery({
        queryKey: customerQueryKeys.all,
        queryFn: getAllCustomers,
    })
};
export default useCustomer;