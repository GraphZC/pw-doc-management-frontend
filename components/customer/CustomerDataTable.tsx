import { Customer } from "@/interface/customer";
import { TableColumn } from "react-data-table-component";
import DataTable from "../DataTable";
import ActionButton from "../ActionButton";
import useDeleteCustomer from "@/api/customer/useDeleteCustomer";
import { useRouter } from "next/navigation";

export default function CustomerDataTable({data} : {data: Customer[]}){
    const deleteMutation = useDeleteCustomer();
    const router = useRouter();

    const handleDelete = (id: string) => {
        deleteMutation.mutateAsync(id);
    }
    const handleEdit = (id: string) => {
        router.push(`/customer/${id}`)
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
            cell: (row: Customer) => <ActionButton id={row.id!} handleDelete={handleDelete} handleEdit={handleEdit}/>
        },
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}