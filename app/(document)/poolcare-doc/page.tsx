'use client'

import PoolCareDoc from "@/components/document/PoolcareDoc";
import usePoolCareDoc from "@/store/usePoolCareDoc";
import '../a4.css';

export default function PoolCareDocPage() {

    const { data, month, year, setData } = usePoolCareDoc();

    return (
        <div className="A4 landscape">
            <PoolCareDoc
                month={month}
                year={year}
                data={data}
            />        
        </div>

    );
}