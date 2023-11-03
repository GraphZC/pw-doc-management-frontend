'use client'

import useCreateEmployee from "@/api/employee/useCreateEmployee"
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import CreateEmployeeForm from "@/components/employee/CreateEmployeeForm";
import { Employee } from "@/interface/employee";
import { toast } from "react-toastify";

export default function CreateEmployeePage() {
    const createMutation = useCreateEmployee();
    const handleCreate = (data: Employee) => {
        createMutation.mutate(data);
        toast.success("Create employee successfully");
    }
    return (
        <div>
            <BackButton url="/employee" />
            <PageHeader title="สร้างสินค้า" />
            <CreateEmployeeForm handleCreate={handleCreate} />
        </div>
    );
}

