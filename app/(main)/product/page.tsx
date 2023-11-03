'use client'

import useProduct from "@/api/product/useAllProducts";
import PageHeader from "@/components/PageHeader";

export default function ProductPage(){
    const {isPending, error, data} = useProduct();
    
    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;

    return(
        <>
            <PageHeader title= "Product" />
            <div className="mb-5 flex w-full justify-end">
            </div>
        </>
        
    )
}