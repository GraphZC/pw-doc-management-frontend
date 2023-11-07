'use client'

import { Customer } from "@/interface/Customer"
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";

interface EditCustomerFormProps {
    data: Customer;
    handleUpdate: (data: Customer) => void;
}

export default function EditCustomerForm({ data, handleUpdate }: EditCustomerFormProps) {
    const {register, handleSubmit } = useForm<Customer>({defaultValues: data});
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
                    <SubmitButton text="แก้ไข" />
                </div>
            </form>
        </div>
    )
}