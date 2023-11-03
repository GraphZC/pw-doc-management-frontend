'use client'

import useEmployee from "@/api/employee/useAllEmployees";
import PageHeader from "@/components/PageHeader";
import EmployeeDataTable from "@/components/employee/EmployeeDataTable";
import Link from "next/link"
export default function EmployeePage(){
    const {isPending, error, data} = useEmployee();
 
    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;

    return(
        <>
            <PageHeader title = "Employee" />
            <div className="mb-5 flex w-full justify-end">
            </div>
            <EmployeeDataTable data={data}/>
        </>
    );
}