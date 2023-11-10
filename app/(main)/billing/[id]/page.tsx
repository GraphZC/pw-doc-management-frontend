'use client'
import useIssueReceipt from "@/api/bill/useIssueReceipt";
import useOneBill from "@/api/bill/useOneBill";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import OrderTable from "@/components/bill/OrderTable";
import moment from "moment";
import Link from "next/link";

export default function ManageBill( {params} : {params: {id: string}} ) {
    const {isPending, error, data} = useOneBill(params.id);
    const issueReceipt = useIssueReceipt();
    if (isPending) return <div>Loading...</div>

    if (error) return <div>{error.message}</div>

    return (
        <div>
            <BackButton url="/billing" />
            <PageHeader title="จัดการบิล" />
            <div className="mb-5 flex w-full justify-end">
                <div className="flex gap-2">
                    <Link 
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        href={`/invoice/${data.id}`}
                    >
                        พิมพ์ใบแจ้งหนี้
                    </Link>
                    { data.invoice?.paidAt == null ? 
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => issueReceipt.mutate(data.id!)}
                        >
                            ออกใบเสร็จ
                        </button>
                        :
                        <Link 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            href={`/receipt/${data.id}`}
                        >
                            พิมพ์ใบเสร็จ
                        </Link>
                    }
                </div>
            </div>
            <div className="mb-5">
                <div className="flex justify-between">
                    <div>
                        <div className="mb-2 font-semibold">ชื่อลูกค้า</div>
                        <div className="mb-2">{data?.customer?.name}</div>
                    </div>
                    <div>
                        <div className="mb-2 font-semibold">พนักงาน</div>
                        <div className="mb-2">{data?.employee?.name}</div>
                    </div>
                </div>
                <div className="flex justify-between text-right">
                    <div className="text-left">
                        <div className="mb-2 font-semibold">วันที่สร้าง</div>
                        <div className="mb-2">{ moment(data.createdAt).add(543, 'year').format('DD/MM/YYYY HH:mm:ss') }</div>
                    </div>
                    <div>
                        <div className="mb-2 font-semibold">สถานะ</div>
                        <div className="mb-2">{ data?.invoice?.paidAt == null ? <div className="text-red-500">ยังไม่จ่าย</div> : <div className="text-green-500">{ `จ่ายแล้วเมื่อ ${moment(data.invoice.paidAt).add(543, 'year').format('DD/MM/YYYY HH:mm:ss')}` }</div> }</div>
                    </div>
                </div>
            </div>
            <OrderTable customerOrder={data} />
            <div className="flex justify-end mt-4">
                
            </div>
            
        </div>
    )
}