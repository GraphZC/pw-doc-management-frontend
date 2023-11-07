'use client'

import useAllPools from "@/api/pool/useAllPools";
import CreateButton from "@/components/CreateButton";
import PageHeader from "@/components/PageHeader";
import PoolCareDataTable from "@/components/poolcare/PoolCareDataTable";

export default function PoolCare() {
    const {isPending, error, data} = useAllPools();
    
    
    if(isPending) return <div>Loading...</div>;
console.log(data);
    if(error) return <div>{error.message}</div>;
    return (
        <>
            <PageHeader title="ใบดูแลสระว่ายน้ำ" />
            <div className="mb-5 flex w-full justify-end">
                <CreateButton url="/poolcare/create" />
            </div>
            <PoolCareDataTable data={data}/>

            
        </>
    )
}