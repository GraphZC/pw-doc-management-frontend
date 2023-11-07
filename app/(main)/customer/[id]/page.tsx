'use client'

import useOneCustomer from "@/api/customer/useOneCustomer";
import useEditCustomer from "@/api/customer/useEditCustomer";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import EditCustomerForm from "@/components/customer/EditCustomerForm";
import { Customer } from "@/interface/Customer";

export default function ViewCustomerPage({params} : {params: {id: string}}) {
    const {isPending, error, data} = useOneCustomer(params.id);
    const editCustomer = useEditCustomer();

    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;
    const handleUpdate = (data: Customer) => {
        editCustomer.mutate(data);
    }

    return (
        <div>
            <BackButton url="/customer" />
            <PageHeader title="แก้ไขลูกค้า" />
            <EditCustomerForm 
            handleUpdate={handleUpdate} 
            data={data}
            />
        </div>
    );
}