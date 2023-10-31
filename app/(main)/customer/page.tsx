'use client'

import useCustomer from "@/api/customer/useCustomer"
import PageHeader from "@/components/PageHeader";
import CustomerDataTable from "@/components/customer/CustomerDataTable";
export default function CustomerPage() {
    const {isPending, error, data} = useCustomer();
    
    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;
    console.log(data);

    return(
        <>
            <PageHeader title= "Customer" />
            <div className="mb-5 flex w-full justify-end">
            </div>
            {/* <CustomerDataTable data={data}/> */}
        </>
    )
}