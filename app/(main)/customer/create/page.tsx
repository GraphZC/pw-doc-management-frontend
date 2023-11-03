'use client'

import useCreateCustomer from "@/api/customer/useCreateCustomer"
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import CreateCustomerForm from "@/components/customer/CreateCustomerForm";
import { Customer } from "@/interface/customer";
import { toast } from "react-toastify";

export default function CreateCustomerPage() {
    const createMutation = useCreateCustomer();
    const handleCreate = (data: Customer) => {
        createMutation.mutate(data);
        toast.success("Create customer successfully");
    }
    return (
        <div>
            <BackButton url="/customer" />
            <PageHeader title="สร้างลูกค้า" />
            <CreateCustomerForm handleCreate={handleCreate} />
        </div>
    );
}