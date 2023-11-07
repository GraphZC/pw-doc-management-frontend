'use client' 

import useAllCustomer from "@/api/customer/useAllCustomers";
import useCreatePool from "@/api/pool/useCreatePool";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import CreatePoolcareForm from "@/components/poolcare/CreatePoolcareForm";
import { Pool } from "@/interface/Pool";
import { toast } from "react-toastify";

export default function CreatePoolCarePage() {
    const createMutation = useCreatePool();

    const handleCreate = (data: Pool) => {
        createMutation.mutate(data)
        toast.success("Create poolcare successfully");
        console.log(data);
    }

    const {isPending: isPendingCustomer, error: errorCustomer, data: dataCustomer} = useAllCustomer();

    if (isPendingCustomer) return <div>Loading...</div>;

    if (errorCustomer) return <div>{errorCustomer.message}</div>;

    return (
        <div>
            <BackButton url="/poolcare" />
            <PageHeader title="เพิ่มสระว่ายน้ำ" />
            <div>
                <CreatePoolcareForm 
                    handleCreate={handleCreate}
                    customer={dataCustomer}
                />
            </div>
       </div>
    )
}

