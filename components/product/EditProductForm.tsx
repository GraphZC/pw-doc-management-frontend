'use client'

import { Product } from "@/interface/product"
import { useForm } from "react-hook-form";

interface EditProductFormProps {
    data: Product;
    handleUpdate: (data: Product) => void;
}

export default function EditProductForm({ data, handleUpdate }: EditProductFormProps) {
    const {register, handleSubmit } = useForm<Product>({defaultValues: data});
    return (
        <div>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <div className="mb-2">
                    <label htmlFor="id">ID</label>
                    <input
                    type="text"
                    id="id"
                    className="input-primary"
                    required={true}
                    {...register('id')}
                    readOnly
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="code">Code</label>
                    <input
                    type="text"
                    id="code"
                    className="input-primary"
                    required={true}
                    {...register('code')}
                    />
                </div><div className="mb-2">
                    <label htmlFor="name">Name</label>
                    <input
                    type="text"
                    id="name"
                    className="input-primary"
                    required={true}
                    {...register('name')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="description">Description</label>
                    <input
                    type="text"
                    id="description"
                    className="input-primary"
                    required={true}
                    {...register('description')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="price">Price</label>
                    <input
                    type="number"
                    min={0}
                    id="price"
                    className="input-primary"
                    required={true}
                    {...register('price')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="unit">Unit</label>
                    <input
                    type="text"
                    id="unit"
                    className="input-primary"
                    required={true}
                    {...register('unit')}
                    />
                </div>
                <div className="mt-4">
                    <button className="submit-button">Edit</button>
                </div>
            </form>
        </div>
    )
}
