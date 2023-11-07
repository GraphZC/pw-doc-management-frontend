'use client'

import useOnePool from "@/api/pool/useOnePool";
import useEditPool from "@/api/pool/useEditPool";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import EditPoolCareForm from "@/components/pool/EditPoolCareForm";
import { Pool } from "@/interface/Pool";

export default function ViewPoolPage({params} : {params: {id: string}}) {
    const {isPending, error, data} = useOnePool(params.id);
    const editPool = useEditPool();

    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;
    const handleUpdate = (data: Pool) => {
        editPool.mutate(data);
    }

    return (
        <div>
            <BackButton url="/pool" />
            <PageHeader title="แก้ไขสระว่ายน้ำ" />
            <EditPoolCareForm 
            handleUpdate={handleUpdate} 
            data={data}
            />
        </div>
    );
}


