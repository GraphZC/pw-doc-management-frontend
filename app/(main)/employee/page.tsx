'use client'

import PageHeader from "@/components/PageHeader";
import EmployeeDataTable from "@/components/employee/EmployeeDataTable";
import Link from "next/link"
export default function EmployeePage(){
    return(
        <>
            <PageHeader title = "Employee" />
            <div className="mb-5 flex w-full justify-end">
            </div>
        </>
    );
}