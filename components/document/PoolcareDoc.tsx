import { Pool } from "@/interface/Pool";

interface PoolCareDocProps {
    month: number;
    year: number;
    data: Pool;
};

export default function PoolCareDoc({ month, year, data }: PoolCareDocProps) {
    return (
        <div>
            <table className="w-full text-center">
                <tr>
                    <td colSpan={9}>
                        รายการทำความสะอาดสระว่ายน้ำ/และอุปกรณ์    
                    </td>
                    <td colSpan={7}>
                        เช็ควาล์วในห้องเครื่องก่อนกลับ
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>PH</td>
                    <td>CL</td>
                    <td>ดูดตะกอน</td>
                    <td>ช้อนใบไม้</td>
                    <td>ขัดสระ</td>
                    <td>B/W</td>
                    <td>ตะกร้าสกิมเมอร์</td>
                    <td>ตะกร้าหน้าปั๊ม</td>
                    <td>วาล์วดูดตะกอน</td>
                    <td>วาล์วสระดือ</td>
                    <td>วาล์วแท็งค์</td>
                    <td>วาล์วสกิมเมอร์</td>
                    <td>ปะปา</td>
                    <td>เวลาเข้า-ออก</td>
                    <td>ลายเซ็นต์</td>
                </tr>
                { Array(10).fill(0).map((_, i) => (
                    <tr key={i}>
                        <td>1</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                )) }
            </table>
        </div>
    )
}