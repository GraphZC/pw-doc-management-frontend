'use client'

import usePoolCareDoc from "@/store/usePoolCareDoc";

export default function PoolCareDocPage() {

    const { data, month, year, setData } = usePoolCareDoc();

    return (
        <PoolCareDocPage 
            month={month}
            year={year}
            data={data}
        />        
    );
}