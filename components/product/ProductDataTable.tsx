import useDeleteProduct from "@/api/product/useDeleteProduct";
import { Product } from "@/interface/product";
import { useRouter } from "next/navigation";
import { TableColumn } from "react-data-table-component";
import DataTable from "../DataTable";
import ActionButton from "../ActionButton";

export default function ProductDataTable({data} : {data: Product[]}){
    const deleteMutation = useDeleteProduct();
    const router = useRouter();

    const handleDelete = (id: string) => {
        deleteMutation.mutateAsync(id);
    }
    const handleEdit = (id: string) => {
        router.push(`/product/${id}`)
    }
    const columns: TableColumn<Product>[] = [ 
        {
            name: 'Code',
            selector: (row: Product) => row.code!,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row: Product) => row.name!,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row: Product) => row.description!,
            sortable: true,
        },
        {
            name: 'Price',
            selector: (row: Product) => row.price!,
            sortable: true,
        },
        {
            name: 'Unit',
            selector: (row: Product) => row.unit!,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row: Product) => <ActionButton id={row.id!} handleDelete={handleDelete} handleEdit={handleEdit}/>
        },
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}