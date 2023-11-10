import { CustomerOrder } from "@/interface/CustomerOrder";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react"
import billQueryKeys from "./billQueryKeys";

const getAllBills = async() => {
    const session = await getSession();

    const{data} = await axios.get<CustomerOrder[]>("/bill/", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useAllBill = () =>{
    return useQuery({
        queryKey: billQueryKeys.all,
        queryFn: getAllBills,
    })
};
export default useAllBill;