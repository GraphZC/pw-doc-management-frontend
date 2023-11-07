

import PoolType from "@/enum/PoolType";
import { Pool } from "@/interface/Pool";
import moment from "moment";
interface PoolCareDocProps {
    month: number;
    year: number;
    data: Pool[];
};

export default function PoolCareDoc({ month, year, data }: PoolCareDocProps) {
    const getDate = (): Date => {
        const date = new Date()
        date.setFullYear(year);
        date.setMonth(month);
        return date;
    }

    const date = getDate();

    const convertEngDayToThai = (day: string) => {
        switch (day) {
            case 'monday':
                return 'จันทร์';
            case 'tuesday':
                return 'อังคาร';
            case 'wednesday':
                return 'พุธ';
            case 'thursday':
                return 'พฤหัสบดี';
            case 'friday':
                return 'ศุกร์';
            case 'saturday':
                return 'เสาร์';
            case 'sunday':
                return 'อาทิตย์';
            default:
                return '';
        }
    }


    const getServiceDayEng = (pool: Pool): string[] => {
        const engDays = Object.keys(pool.serviceDay!).filter((day) => pool.serviceDay![day as keyof typeof pool.serviceDay] === true);
        return engDays
    }
    const getServiceDayTH = (pool: Pool) => {
        const thaiDays = getServiceDayEng(pool).map((day) => convertEngDayToThai(day));
        return thaiDays.join(', ');
    }

    const isTheSameDay = (pool: Pool, date: number) => {
        const day = moment(new Date(year, month, date)).locale("En").format("dddd").toLowerCase();
        console.log(day, getServiceDayEng(pool), getServiceDayEng(pool))
        return getServiceDayEng(pool).includes(day);
        
    }

    return data.map((pool: Pool, index: number) => (
        <section className="sheet p-2" key={index}>
            <div className="text-center">
                <div>ตารางการปฏิบัติงานดูแลสระว่ายน้ำ   "POOL WORLD"</div>
                <div>งานดูแลสระว่ายน้ำ คุณ { pool.customer?.name } { pool.address }</div>

                <div>ระยะเวลาดูแลสระว่ายน้ำ 1 - { moment(date).endOf('month').date() } { date.toLocaleString('th-TH', {month: 'long'}) } { getDate().getFullYear() } เข้า { getServiceDayTH(pool) } สถานะ : { pool.chemicalIncluded ? "รวม" : "ไม่รวม" }เคมี { pool.type === PoolType.CHLORINE ? "ระบบครอรีน" : "ระบบเกลือ" } </div>
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
                    { Array(moment(date).endOf('month').date()).fill(0).map((_, i) => (
                        <tr key={i}>
                            <td className={ isTheSameDay(pool, i + 1) ? "bg-red-200": "" } >{ i + 1 }</td>
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
        </section>
    ));
}