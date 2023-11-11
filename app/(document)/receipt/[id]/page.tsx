'use client'
import useOneBill from '@/api/bill/useOneBill';
import '../../a4.css';
import moment from 'moment';
import OrderTable from '@/components/bill/OrderTable';

export default function ReceiptPage( {params} : {params: {id: string}} ) {
    const {isPending, error, data} = useOneBill(params.id);

    if (isPending) return <div>Loading...</div>

    if (error) return <div>{error.message}</div>

    return (
        <div className='A4 '>
            <section className="sheet p-5">
                <h1 className='text-center font-bold'>ใบเสร็จรับเงิน</h1>
                <div className='flex justify-between'>
                    <div>
                        <div className="mb-2 font-bold text-blue-500">{data?.customer?.name}</div>
                        <div className="mb-2">{data?.customer?.address}</div>
                        <div className="mb-2">{data?.customer?.telephone}</div>
                        <div className='mb-2'>{data?.customer?.taxId}</div>
                    </div>
                    <div className='text-red-400'>
                        จ่ายแล้วเมื่อ { moment(data.invoice?.paidAt).add(543, 'year').format('DD/MM/YYYY HH:mm:ss') }
                    </div>
                </div>
                <hr className='my-5'/>
                <OrderTable customerOrder={data} />
                <hr className='my-5'/> 
                <div className='my-5 flex justify-between'>
                    <div className=''>
                        <div className='mb-3 text-blue-500 font-bold'>ข้อมูลติดต่อ</div>
                        <div>
                            พูลเวิลด์ พัทยา
                        </div>
                        <div className='mt-2'>
                            โทรศัพท์ 02-123-4567
                        </div>
                    </div>
                    <div>
                        <div className='text-blue-500 font-bold mb-20 text-center'>ผู้รับเงิน</div>
                        <div className='text-center'>( { data.employee?.name } )</div>

                    </div>
                </div>
            </section>
        </div>
    )    
}