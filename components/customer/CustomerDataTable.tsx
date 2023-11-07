import { Customer } from "@/interface/Customer";
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
            name: 'ชื่อ',
            selector: (row: Customer) => row.name!,
            sortable: true,
        },
        {
            name: 'เบอร์โทรศัพท์',
            selector: (row: Customer) => row.telephone!,
            sortable: true,
        },
        {
            name: '',
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