'use client' 

import PageHeader from "@/components/PageHeader";
import CreatePoolcareForm from "@/components/poolcare/CreatePoolcareForm";

export default function PoolCare() {

    const handleCreate = (data: any) => {
        console.log(data);
    }

    return (
        <div>
            <PageHeader title="เพิ่มสระว่ายน้ำ" />
            <div>
                <CreatePoolcareForm 
                    handleCreate={handleCreate}
                />
            </div>
       </div>
    )
}