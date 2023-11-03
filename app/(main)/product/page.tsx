'use client'

import useProduct from "@/api/product/useAllProducts";
import PageHeader from "@/components/PageHeader";
import ProductDataTable from "@/components/product/ProductDataTable";
import Link from "next/link";

export default function ProductPage(){
    const {isPending, error, data} = useProduct();
    
    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;

    return(
        <>
            <PageHeader title= "Product" />
            <div className="mb-5 flex w-full justify-end">
                <Link href="/product/create" className ="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block" >+Create</Link>
            </div>
            <ProductDataTable data={data} />
        </>
        
    )
}