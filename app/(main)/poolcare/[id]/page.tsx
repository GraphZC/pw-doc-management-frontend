'use client'

import useOnePool from "@/api/pool/useOnePool";
import useEditPool from "@/api/pool/useEditPool";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import EditPoolCareForm from "@/components/poolcare/EditPoolCareForm";
import { Pool } from "@/interface/Pool";
import useAllCustomers from "@/api/customer/useAllCustomers";

export default function ViewPoolPage({params} : {params: {id: string}}) {
    const {isPending, error, data} = useOnePool(params.id);
    const editPool = useEditPool();

    const {isPending: isPendingCustomer, error: errorCustomer, data: customers} = useAllCustomers();

    if(isPending || isPendingCustomer) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;
    const handleUpdate = (data: Pool) => {
        editPool.mutate(data);
    }

    return (
        <div>
            <BackButton url="/pool" />
            <PageHeader title="แก้ไขสระว่ายน้ำ" />
            <EditPoolCareForm 
                customers={customers!}
                handleUpdate={handleUpdate} 
                data={data}
            />
        </div>
    );
}


