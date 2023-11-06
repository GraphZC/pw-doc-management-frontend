'use client'

import { Product } from "@/interface/product";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import PoolType from "@/enum/PoolType";

interface CreatePoolcareFormProps {
    handleCreate: (data: Product) => void;
}

export default function CreatePoolcareForm({ handleCreate }: CreatePoolcareFormProps) {
    const {register, handleSubmit, reset, formState} = useForm();
    useEffect(() => {
        if(formState.isSubmitSuccessful){
            reset();
        }
    },[formState, reset])
    return (
        <div>
            <form onSubmit={handleSubmit(handleCreate)}>
                <div className="mb-2">
                    <label htmlFor="address">ที่อยู่</label>
                    <textarea
                        id="address"
                        className="input-primary"
                        required={true}
                        {...register('address')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="price">ราคา</label>
                    <input
                        type="number"
                        id="name"
                        className="input-primary"
                        required={true}
                        min={0}
                        {...register('price')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="name">รวมเคมี</label>
                    <input
                        type="checkbox"
                        id="chemicalInclude"
                        className="ml-2 px-5 py-[10px] rounded-md cursor-pointer border-gray-300"
                        required={true}
                        {...register('chemicalInclude')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="poolType">ประเภทสระ</label>
                    <select
                        id="poolType"
                        className="input-primary"
                        required={true}
                        {...register('poolType')}
                    >
                        <option value={PoolType.CHLORINE}>สระครอรีน</option>
                        <option value={PoolType.SALT}>สระเกลือ</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label htmlFor="poolType">สถานะ</label>
                    <select
                        id="poolType"
                        className="input-primary"
                        required={true}
                        {...register('poolType')}
                    >
                        <option value={PoolType.CHLORINE}>อยู่ในการดูแล</option>
                        <option value={PoolType.SALT}>ไม่ได้อยู่ในการดูแล</option>
                    </select>
                </div>
                
                <div className="mt-4">
                    <SubmitButton text="สร้าง" />
                </div>
            </form>
        </div>
    )
}
