'use client'

import useCustomer from "@/api/customer/useAllCustomers"
import PageHeader from "@/components/PageHeader";
import CustomerDataTable from "@/components/customer/CustomerDataTable";
import Link from "next/link";
export default function CustomerPage() {
    const {isPending, error, data} = useCustomer();
    
    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;

    return(
        <>
            <PageHeader title= "Customer" />
            <div className="mb-5 flex w-full justify-end">
                <Link href="/customer/create" className ="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block" >+Create</Link>
            </div>
            <CustomerDataTable data={data}/>
        </>
    )
}