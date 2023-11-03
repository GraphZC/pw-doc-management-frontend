'use client'

import useCustomer from "@/api/customer/useAllCustomers"
import CreateButton from "@/components/CreateButton";
import PageHeader from "@/components/PageHeader";
import CustomerDataTable from "@/components/customer/CustomerDataTable";
import Link from "next/link";
export default function CustomerPage() {
    const {isPending, error, data} = useCustomer();
    
    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;

    return(
        <>
            <PageHeader title= "ลูกค้า" />
            <div className="mb-5 flex w-full justify-end">
                <CreateButton url="/customer/create" />
            </div>
            <CustomerDataTable data={data}/>
        </>
    )
}