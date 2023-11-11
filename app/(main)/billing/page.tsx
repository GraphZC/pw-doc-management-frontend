'use client'

import useAllBill from "@/api/bill/useAllBill";
import CreateButton from "@/components/CreateButton";
import PageHeader from "@/components/PageHeader";
import BillDataTable from "@/components/bill/BillDataTable";

export default function Billing() {
    const { isPending, error, data } = useAllBill();

    if (isPending) return <div>Loading...</div>

    if (error) return <div>{error.message}</div>

    return (
        <div>
            <PageHeader title="จัดการบิล"/>
            <div className="mb-5 flex w-full justify-end">
                <CreateButton url="/billing/create" />
            </div>
            <BillDataTable data={ data }/>
        </div>
    )
}