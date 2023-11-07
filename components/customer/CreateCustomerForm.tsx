'use client'

import { Customer } from "@/interface/Customer";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";

interface CreateCustomerFormProps {
    handleCreate: (data: Customer) => void;
}

export default function CreateCustomerForm({ handleCreate }: CreateCustomerFormProps) {
    const {register, handleSubmit, reset, formState} = useForm<Customer>();
    useEffect(() => {
        if(formState.isSubmitSuccessful){
            reset();
        }
    },[formState, reset])
    return (
        <div>
            <form onSubmit={handleSubmit(handleCreate)}>
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
                    <label htmlFor="address">ที่อยู่</label>
                    <input
                    type="text"
                    id="address"
                    className="input-primary"
                    required={true}
                    {...register('address')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="telephone">เบอร์โทรศัพท์</label>
                    <input
                    type="text"
                    id="telephone"
                    className="input-primary"
                    required={true}
                    {...register('telephone')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="taxId">เลขประจำตัวผู้เสียภาษี</label>
                    <input
                    type="text"
                    id="taxId"
                    className="input-primary"
                    required={true}
                    {...register('taxId')}
                    />
                </div>
                <div className="mt-4">
                    <SubmitButton text="สร้าง" />
                </div>
            </form>
        </div>
    )
}