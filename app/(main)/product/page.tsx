'use client'

import useProduct from "@/api/product/useAllProducts";
import CreateButton from "@/components/CreateButton";
import PageHeader from "@/components/PageHeader";
import ProductDataTable from "@/components/product/ProductDataTable";
import Link from "next/link";

export default function ProductPage(){
    const {isPending, error, data} = useProduct();
    
    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;

    return(
        <>
            <PageHeader title= "สินค้า" />
            <div className="mb-5 flex w-full justify-end">
                <CreateButton url="/product/create" />
            </div>
            <ProductDataTable data={data} />
        </>
        
    )
}