'use client'

import { Product } from "@/interface/product";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateProductFormProps {
    handleCreate: (data: Product) => void;
}

export default function CreateProductForm({ handleCreate }: CreateProductFormProps) {
    const {register, handleSubmit, reset, formState} = useForm<Product>();
    useEffect(() => {
        if(formState.isSubmitSuccessful){
            reset();
        }
    },[formState, reset])
    return (
        <div>
            <form onSubmit={handleSubmit(handleCreate)}>
                <div className="mb-2">
                    <label htmlFor="code">Code</label>
                    <input
                    type="text"
                    id="code"
                    className="input-primary"
                    required={true}
                    {...register('code')}
                    />
                </div>
                <div className="mb-2">
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
                    <button className="submit-button">Create</button>
                </div>
            </form>
        </div>
    )
}
