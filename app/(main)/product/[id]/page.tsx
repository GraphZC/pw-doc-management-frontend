'use client'

import useOneProduct from "@/api/product/useOneProduct";
import useEditProduct from "@/api/product/useEditProduct";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import EditProductForm from "@/components/product/EditProductForm";
import { Product } from "@/interface/Product";

export default function ViewProductPage({params} : {params: {id: string}}) {
    const {isPending, error, data} = useOneProduct(params.id);
    const editProduct = useEditProduct();

    if(isPending) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;
    const handleUpdate = (data: Product) => {
        editProduct.mutate(data);
    }

    return (
        <div>
            <BackButton url="/product" />
            <PageHeader title="แก้ไขสินค้า" />
            <EditProductForm 
            handleUpdate={handleUpdate} 
            data={data}
            />
        </div>
    );
}
