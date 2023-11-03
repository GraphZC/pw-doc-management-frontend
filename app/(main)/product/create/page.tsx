'use client'

import useCreateProduct from "@/api/product/useCreateProduct"
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import CreateProductForm from "@/components/product/CreateProductForm";
import { Product } from "@/interface/product";
import { toast } from "react-toastify";

export default function CreateProductPage() {
    const createMutation = useCreateProduct();
    const handleCreate = (data: Product) => {
        createMutation.mutate(data);
        toast.success("Create product successfully");
    }
    return (
        <div>
            <BackButton url="/product" />
            <PageHeader title="Create Product" />
            <CreateProductForm handleCreate={handleCreate} />
        </div>
    );
}
