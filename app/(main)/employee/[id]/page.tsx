'use client'

import useOneEmployee from "@/api/employee/useOneEmployee";
import useEditEmployee from "@/api/employee/useEditEmployee";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import EditEmployeeForm from "@/components/employee/EditEmployeeForm";
import { Employee } from "@/interface/employee";

export default function ViewEmployeePage({params} : {params: {id: string}}) {
    const {isPending, error, data} = useOneEmployee(params.id);
    const editEmployee = useEditEmployee();

    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;
    const handleUpdate = (data: Employee) => {
        editEmployee.mutate(data);
    }

    return (
        <div>
            <BackButton url="/employee" />
            <PageHeader title="แก้ไขพนักงาน" />
            <EditEmployeeForm 
            handleUpdate={handleUpdate} 
            data={data}
            />
        </div>
    );
}

