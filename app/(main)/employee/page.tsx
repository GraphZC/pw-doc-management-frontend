'use client'

import useEmployee from "@/api/employee/useAllEmployees";
import CreateButton from "@/components/CreateButton";
import PageHeader from "@/components/PageHeader";
import EmployeeDataTable from "@/components/employee/EmployeeDataTable";
export default function EmployeePage(){
    const {isPending, error, data} = useEmployee();
 
    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;

    return(
        <>
            <PageHeader title = "พนักงาน" />
            <div className="mb-5 flex w-full justify-end">
                <CreateButton url="/employee/create" />
            </div>
            <EmployeeDataTable data={data}/>
        </>
    );
}