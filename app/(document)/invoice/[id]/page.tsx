'use client'
import useOneBill from '@/api/bill/useOneBill';
import '../../a4.css';
import moment from 'moment';
import OrderTable from '@/components/bill/OrderTable';

export default function InvoicePage( {params} : {params: {id: string}} ) {
    const {isPending, error, data} = useOneBill(params.id);

    if (isPending) return <div>Loading...</div>

    if (error) return <div>{error.message}</div>

    return (
        <div className='A4 '>
            <section className="sheet p-5">
                <h1 className='text-center font-bold'>ใบแจ้งหนี้</h1>
                <div className='flex justify-between'>
                    <div>
                        <div className="mb-2 font-bold text-blue-500">{data?.customer?.name}</div>
                        <div className="mb-2">{data?.customer?.address}</div>
                        <div className="mb-2">{data?.customer?.telephone}</div>
                        <div className='mb-2'>{data?.customer?.taxId}</div>
                    </div>
                    <div>
                        วันที่ { moment(data.createdAt).add(543, 'year').format('DD/MM/YYYY HH:mm:ss') }
                    </div>
                </div>
                <hr className='my-5'/>
                <OrderTable customerOrder={data} />
                <hr className='my-5'/> 
                <div>
                    <div className='mb-3 font-bold text-blue-500'>
                        ชำระเงินที่
                    </div>
                    <div className='flex gap-2'>
                        <div>
                            <div className='font-semibold'>ธนาคาร</div>
                            <div className='font-semibold'>เลขที่บัญชี</div>
                        </div>
                        <div>
                            <div>กรุงไทย</div>
                            <div>123-456-789</div>
                        </div>
                    </div>
                </div>
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
                        <div className='text-blue-500 font-bold mb-20'>ผู้ออกใบแจ้งหนี้</div>
                        <div className='text-center'>( { data.employee?.name } )</div>

                    </div>
                </div>
            </section>
        </div>
    )    
}