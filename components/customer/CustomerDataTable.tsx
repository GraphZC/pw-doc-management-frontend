import { Customer } from "@/interface/customer";
import { TableColumn } from "react-data-table-component";
import DataTable from "../DataTable";
import ActionButton from "../ActionButton";
import useDeleteCustomer from "@/api/customer/useDeleteCustomer";

export default function CustomerDataTable({data} : {data: Customer[]}){
    const deleteMutation = useDeleteCustomer();

    const handleDelete = (id: string) => {
        deleteMutation.mutateAsync(id);
    }
    const columns: TableColumn<Customer>[] = [ 
        {
            name: 'ID',
            selector: (row: Customer) => row.id!,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row: Customer) => row.name!,
            sortable: true,
        },
        {
            name: 'Telephone',
            selector: (row: Customer) => row.telephone!,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row: Customer) => <ActionButton id={row.id!} handleDelete={handleDelete}/>
        },
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}