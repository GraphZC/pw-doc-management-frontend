'use client'

import { Product } from "@/interface/product";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";

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
                    <label htmlFor="code">รหัสสินค้า</label>
                    <input
                    type="text"
                    id="code"
                    className="input-primary"
                    required={true}
                    {...register('code')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="name">ชื่อ</label>
                    <input
                    type="text"
                    id="name"
                    className="input-primary"
                    required={true}
                    {...register('name')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="description">คำอธิบาย</label>
                    <textarea
                    id="description"
                    className="input-primary"
                    required={true}
                    {...register('description')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="price">ราคา</label>
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
                    <label htmlFor="unit">หน่วย</label>
                    <input
                    type="text"
                    id="unit"
                    className="input-primary"
                    required={true}
                    {...register('unit')}
                    />
                </div>
                <div className="mt-4">
                    <SubmitButton   text="สร้าง" />
                </div>
            </form>
        </div>
    )
}
