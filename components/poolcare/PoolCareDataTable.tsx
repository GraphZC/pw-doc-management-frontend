'use client'

import useDeletePool from "@/api/pool/useDeletePool";
import { Pool } from "@/interface/Pool";
import DataTable, { TableColumn } from "react-data-table-component";
import ActionButton from "../ActionButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import usePoolCareDoc from "@/store/usePoolCareDoc";
import useCreateBill from "@/api/bill/useCreateBill";
import { CustomerOrder } from "@/interface/CustomerOrder";
import { useSession } from "next-auth/react";
import MySwal from "@/lib/sweetAlert";

export default function PoolCareDataTable( {data} : {data: Pool[]}){
    const { data: session, status } = useSession();
    const router = useRouter();
    const deleteMutation = useDeletePool();
    const createBillMutation = useCreateBill();
    const { setData } = usePoolCareDoc();

    if (status === 'loading') {
        return <div>Loading...</div>
    }

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
                    <button
                        className="bg-violet-500 px-2 py-1 rounded-lg text-white mr-2"
                        onClick={() => {
                            MySwal.fire({
                                title: "เลือกประเภทบิล",
                                text: "บิลภาษี หรือ บิลธรรมดา",
                                icon: "warning",
                                showCancelButton: true,
                                showDenyButton: true,
                                confirmButtonText: "บิลภาษี",
                                confirmButtonColor: "#3085d6",
                                cancelButtonText: "ยกเลิก",
                                cancelButtonColor: "#A4A4A4",
                                denyButtonText: `บิลธรรมดา`,
                                denyButtonColor: "#123145",

                            }).then((result) => {
                                let vatIncluded = false;
                                if (result.isConfirmed) {
                                    vatIncluded = true;
                                } else if (result.isDismissed) {
                                    return;
                                }

                                createBillMutation.mutate({
                                    employeeId: session?.user?.id!,
                                    customerId: row.customer?.id!,
                                    invoice: {
                                        vatIncluded: vatIncluded
                                    },
                                    purchase: [
                                        {
                                            poolId: row.id,
                                            quantity: 1,
                                        }
                                    ]
                                })
                            })
                        }}
                    >
                        ออกใบแจ้งหนี้
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