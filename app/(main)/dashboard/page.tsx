'use client'

import useAllBill from "@/api/bill/useAllBill";
import useCustomer from "@/api/customer/useAllCustomers";
import useEmployee from "@/api/employee/useAllEmployees";
import usePool from "@/api/pool/useAllPools";
import useProduct from "@/api/product/useAllProducts";

export default function Dashboard() {


    const { isPending: employeePending, error: employeeError, data: employee } = useEmployee();
    const { isPending: customerPending, error: customerError, data: customer } = useCustomer();
    const { isPending: productPending, error: productError, data: product } = useProduct();
    const { isPending: poolcarePending, error: poolcareError, data: poolcare } = usePool();
    const { isPending: billPending, error: billError, data: bill } = useAllBill();

    if ( employeePending && customerPending && productPending && poolcarePending && billPending ) {
        return <div>Loading...</div>
    }

    let totalPrice = 0;
    bill?.forEach((b) => {
        b.purchase?.forEach((p) => {
            if (p.poolId === null) {
                totalPrice += p.product?.price! * p.quantity!;
            } else {
                totalPrice += p.pool?.price!;
            }
        })
    })    

    function commify(n: number) {
        var parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
    }

    return (
        <div>
            <h1 className="font-medium text-xl">แดชบอร์ด</h1>
            <div className="grid grid-cols-5 gap-3 mt-4">
                <div className="bg-white px-4 py-3 rounded-lg  shadow-md">
                    <div className="font-semibold text-lg">
                        ลูกค้า
                    </div>
                    <div className="">
                        {customer?.length} คน
                    </div>
                </div>

                <div className="bg-white px-4 py-3 rounded-lg shadow-md">
                    <div className="font-semibold text-lg">
                        สระที่ดูแล
                    </div>
                    <div>
                        {poolcare?.length} สระ
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold text-blue-500">ดูแลอยู่</div>
                        { poolcare?.filter((pool) => pool.inService).length } สระ
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold text-red-500">หยุดการดูแล</div>
                        { poolcare?.length! - poolcare?.filter((pool) => pool.inService).length! } สระ
                    </div>
                </div>

                <div className="bg-white px-4 py-3 rounded-lg shadow-md" >
                    <div className="font-semibold text-lg">
                        พนักงาน
                    </div>
                    <div>
                        {employee?.length} คน
                    </div>
                </div>

                <div className="bg-white px-4 py-3 rounded-lg shadow-md" >
                    <div className="font-semibold text-lg">
                        สินค้า
                    </div>
                    <div>
                        {product?.length} ชนิด
                    </div>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-md" >
                    <div className="font-semibold text-lg">
                        บิล
                    </div>
                    <div>
                        {bill?.length} รายการ
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold">ยอดขายเดือนนี้</div>
                        <div>
                            { commify(totalPrice) } บาท
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}