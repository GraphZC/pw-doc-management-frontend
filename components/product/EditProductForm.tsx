'use client'

import { Product } from "@/interface/product"
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";

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
                    <label htmlFor="code">รหัสสินค้า</label>
                    <input
                    type="text"
                    id="code"
                    className="input-primary"
                    required={true}
                    {...register('code')}
                    />
                </div><div className="mb-2">
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
                    <SubmitButton   text="แก้ไข" />
                </div>
            </form>
        </div>
    )
}
