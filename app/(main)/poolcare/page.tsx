'use client'

import useAllPools from "@/api/pool/useAllPools";
import CreateButton from "@/components/CreateButton";
import PageHeader from "@/components/PageHeader";
import PoolCareDataTable from "@/components/poolcare/PoolCareDataTable";
import usePoolCareDoc from "@/store/usePoolCareDoc";

export default function PoolCare() {
    const {isPending, error, data} = useAllPools();
    
    const { setMonth, setYear } = usePoolCareDoc();
    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;

    const d = new Date();
    const monthArr = []

    for (let i = -2; i <= 2; i++) {
        monthArr.push(i)
    }

    return (
        <>
            <PageHeader title="ใบดูแลสระว่ายน้ำ" />
            <div className="mb-5 flex justify-between">
                <select className="border-gray-400 border rounded-lg" onChange={ (e) => {
                    const [month, year] = e.target?.value.split(",")
                    setMonth(parseInt(month))
                    setYear(parseInt(year))
                }}>
                    {monthArr.map((month, index) => {
                        const monthName = new Date(d.getFullYear(), d.getMonth() + month).toLocaleString('th-TH', {month: 'long'})
                        const monthNumber = new Date(d.getFullYear(), d.getMonth() + month).getMonth()
                        const year = new Date(d.getFullYear(), d.getMonth() + month).getFullYear()
                        return <option key={index} value={monthNumber + "," + year}>{monthName}</option>
                    })}
                </select>
                <CreateButton url="/poolcare/create" />
            </div>
            <PoolCareDataTable data={data}/>

            
        </>
    )
}