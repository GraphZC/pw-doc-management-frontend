import { CustomerOrder } from "@/interface/CustomerOrder";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { getSession } from "next-auth/react"
import billQueryKeys from "./billQueryKeys";

const getOneBills = async (id: string) => {
    const session = await getSession();

    const{data} = await axios.get<CustomerOrder>(`/bill/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return data;
};

const useOneBill = (id: string) =>{
    return useQuery({
        queryKey: billQueryKeys.detail(id),
        queryFn: () => getOneBills(id),
    })
};
export default useOneBill;