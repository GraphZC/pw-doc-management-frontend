import { Customer } from "@/interface/Customer";
import { TableColumn } from "react-data-table-component";
import DataTable from "../DataTable";
import ActionButton from "../ActionButton";
import useDeleteBill from "@/api/bill/useDeleteBill";
import { useRouter } from "next/navigation";
import { CustomerOrder } from "@/interface/CustomerOrder";
import moment from "moment";

export default function BillDataTable({data} : {data: CustomerOrder[]}){
    const deleteMutation = useDeleteBill();
    const router = useRouter();

    const handleDelete = (id: string) => {
        deleteMutation.mutateAsync(id);
    }
    const handleEdit = (id: string) => {
        router.push(`/billing/${id}`)
    }

    const columns: TableColumn<CustomerOrder>[] = [ 
        {
            name: 'ID',
            selector: (row: CustomerOrder) => row.id!,
            sortable: true,
        },
        {
            name: 'ลูกค้า',
            selector: (row: CustomerOrder) => row!.customer!.name!,
            sortable: true,
        },
        {
            name: 'พนักงาน',
            selector: (row: CustomerOrder) => row!.employee!.name!,
            sortable: true,
        },
        {
            name: 'สถานะ',
            cell: (row: CustomerOrder) => {
                return (
                    <div>
                        { row.invoice?.paidAt == null ? 
                            <div className="text-yellow-500">
                                ยังไม่ได้ชำระเงิน
                            </div>
                            :
                            <div className="text-green-500">
                                ชำระเงินแล้ว
                            </div>
                        }
                    </div>
                )
            }
        },
        {
            name: 'วันที่สร้าง',
            selector: (row: CustomerOrder) => moment(row!.createdAt!).add(543, 'year').format('DD/MM/YYYY HH:mm:ss'),
            sortable: true,
        },
        {
            name: '',
            cell: (row: CustomerOrder) => {
                return (
                    <div className="flex gap-2">
                        <button
                            className="bg-yellow-300 px-2 py-1 rounded-lg text-white"
                            onClick={() => handleEdit(row.id!)} 
                        >
                            จัดการ
                        </button>
                        <button
                            className="bg-red-500 px-2 py-1 rounded-lg text-white"
                            onClick={() => handleDelete(row.id!)} 
                        >
                            ลบ
                        </button>
                    </div>
                )
            }
        },
    ];
    return(
        <DataTable
            columns = {columns}
            data = {data}
        />
    )
}