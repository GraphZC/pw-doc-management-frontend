import useDeleteProduct from "@/api/product/useDeleteProduct";
import { Product } from "@/interface/Product";
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
            name: 'ID',
            selector: (row: Product) => row.id!,
            sortable: true,
        },
        {
            name: 'รหัสสินค้า',
            selector: (row: Product) => row.code!,
            sortable: true,
        },
        {
            name: 'ชื่อ',
            selector: (row: Product) => row.name!,
            sortable: true,
        },
        {
            name: 'คำอธิบาย',
            selector: (row: Product) => row.description!,
            sortable: true,
        },
        {
            name: 'ราคา',
            selector: (row: Product) => row.price!,
            sortable: true,
        },
        {
            name: '',
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