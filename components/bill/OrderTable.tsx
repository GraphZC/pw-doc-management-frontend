import { CustomerOrder } from "@/interface/CustomerOrder";

interface OrderTableProps {
    customerOrder: CustomerOrder;
}
export default function OrderTable({ customerOrder }: OrderTableProps) {
    let totalPrice = 0;
    customerOrder?.purchase?.map((purchase) => {
        totalPrice += purchase.product!.price! * purchase.quantity!;
    })

    const netPrice = totalPrice + (customerOrder?.invoice?.vatIncluded ? totalPrice * 0.07 : 0);
    
    return (
        <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-center">
                            <th scope="col" className="px-6 py-3 w-10">
                                ลำดับ
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                                สินค้า
                            </th>
                            <th scope="col" className="px-6 py-3">
                                จำนวน
                            </th> 
                            <th scope="col" className="px-6 py-3 text-right">
                                ราคาต่อหน่วย
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                ราคารวม
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { customerOrder?.purchase?.map((purchase, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={purchase.id}>
                                <td className="px-6 py-4 text-center">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4">
                                    {purchase.product!.name}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {purchase.quantity}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {purchase.product!.price?.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {(purchase.product!.price! * purchase!.quantity!).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-6 py-4 text-right" colSpan={4}>
                                    ราคารวม
                                </th>
                                <td className="px-6 py-4 text-right">
                                    { totalPrice.toFixed(2) }
                                </td>
                            </tr>
                        { customerOrder?.invoice?.vatIncluded && (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-6 py-4 text-right" colSpan={4}>
                                    ภาษีมูลค่าเพิ่ม
                                </th>
                                <td className="px-6 py-4 text-right">
                                    { (totalPrice * 0.07).toFixed(2) }
                                </td>
                            </tr>
                        )}
                         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th className="px-6 py-4 text-right" colSpan={4}>
                                ราคาสุทธิ
                            </th>
                            <td className="px-6 py-4 text-right">
                                { netPrice.toFixed(2) }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    );
}