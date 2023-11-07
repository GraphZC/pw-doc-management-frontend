'use client'

import useDeletePool from "@/api/pool/useDeletePool";
import { Pool } from "@/interface/Pool";
import DataTable, { TableColumn } from "react-data-table-component";
import ActionButton from "../ActionButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import usePoolCareDoc from "@/store/usePoolCareDoc";

export default function PoolCareDataTable( {data} : {data: Pool[]}){

    const router = useRouter();
    const deleteMutation = useDeletePool();
    const { setData } = usePoolCareDoc();

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
    }
    const handleEdit = (id: string) => {
        router.push(`/poolcare/${id}`);
    }

    const columns : TableColumn<Pool>[] = [
        {
            name: 'ลูกค้า',
            selector: (row: Pool) => row.customer?.name!,
            sortable: true
        },
        {
            name: 'ที่อยู่',
            selector: row => row.address!,
            sortable: true
        },
        {
            name: 'ประเภทสระ',
            selector: row => row.type!,
            sortable: true,
        },
        {   
            name: '',
            cell: (row: Pool) => (
                <>
                    <button 
                        className="bg-blue-500 px-2 py-1 rounded-lg text-white mr-2"
                        onClick={() => { setData([row]); router.push(`/poolcare-doc/`)}}
                    >
                        ใบดูแลสระ
                    </button>
                    <ActionButton id={row.id!.toString()} handleDelete={handleDelete} handleEdit={handleEdit} />
                </>
            ),

        }
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />

    )

};