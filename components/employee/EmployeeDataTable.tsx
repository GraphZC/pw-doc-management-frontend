import { Employee } from "@/interface/employee";
import { TableColumn } from "react-data-table-component";
import DataTable from "../DataTable";
import ActionButton from "../ActionButton";

export default function EmployeeDataTable({data} : {data: Employee[]}){
    const columns: TableColumn<Employee>[] = [
        {
            name: 'ID',
            selector: (row: Employee) => row.id!,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row: Employee) => row.name!,
            sortable: true,
        },
        {
            name: 'Roles',
            selector: (row: Employee) => row.roles!,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row: Employee) => <ActionButton id={row.id!.toString()} handleDelete={handleDelete}/>,
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
