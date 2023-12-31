import { Employee } from "@/interface/Employee";
import { TableColumn } from "react-data-table-component";
import DataTable from "../DataTable";
import ActionButton from "../ActionButton";
import useDeleteCustomer from "@/api/customer/useDeleteCustomer";
import { useRouter } from "next/navigation";
import useDeleteEmployee from "@/api/employee/useDeleteEmployee";
import EmployeeStatusBadge from "./EmployeeStatusBadge";

export default function EmployeeDataTable({data} : {data: Employee[]}){
    const deleteMutation = useDeleteEmployee();
    const router = useRouter();

    const handleDelete = (id: string) => {
        deleteMutation.mutateAsync(id);
    }
    const handleEdit = (id: string) => {
        router.push(`/employee/${id}`)
    }
    const columns: TableColumn<Employee>[] = [
        {
            name: 'ID',
            selector: (row: Employee) => row.id!,
            sortable: true,
        },
        {
            name: 'ชื่อ',
            selector: (row: Employee) => row.name!,
            sortable: true,
        },
        {
            name: 'ตำแหน่ง',
            selector: (row: Employee) => row.role!,
            cell: (row: Employee) => <EmployeeStatusBadge status={row.role!} />,
            sortFunction: (a: Employee , b: Employee) => {
                return a < b ? -1 : 1;
            },
            sortable: true,
        },
        {
            name: '',
            cell: (row: Employee) => <ActionButton id={row.id!.toString()} handleDelete={handleDelete} handleEdit={handleEdit}/>,
        }
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}

function handleDelete(id: string): void {
    throw new Error("Function not implemented.");
}
