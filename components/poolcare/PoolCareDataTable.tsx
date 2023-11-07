'use client'

import useDeletePool from "@/api/pool/useDeletePool";
import { Pool } from "@/interface/pool";
import DataTable, { TableColumn } from "react-data-table-component";
import ActionButton from "../ActionButton";
import { useRouter } from "next/navigation";

export default function PoolCareDataTable( {data} : {data: Pool[]}){

    const router = useRouter();
    const deleteMutation = useDeletePool();

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
    }
    const handleEdit = (id: string) => {
        router.push(`/poolcare/edit/${id}`);
    }

    const columns : TableColumn<Pool>[] = [
        {
            name: 'ลูกค้า',
            selector: row => row.customer?.name,
            sortable: true
        },
        {
            name: 'ที่อยู่',
            selector: row => row.address,
            sortable: true
        },
        {
            name: 'ประเภทสระ',
            selector: row => row.type,
            sortable: true,
        },
        {   
            name: '',
            cell: (row: Pool) => <ActionButton id={row.id!.toString()} handleDelete={handleDelete} handleEdit={handleEdit}/>,

        }
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />

    )

};