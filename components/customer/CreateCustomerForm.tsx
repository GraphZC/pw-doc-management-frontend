'use client'

import { Customer } from "@/interface/customer";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
                    <label htmlFor="address">Address</label>
                    <input
                    type="text"
                    id="address"
                    className="input-primary"
                    required={true}
                    {...register('address')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="telephone">Telephone</label>
                    <input
                    type="text"
                    id="telephone"
                    className="input-primary"
                    required={true}
                    {...register('telephone')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="taxId">TaxId</label>
                    <input
                    type="text"
                    id="taxId"
                    className="input-primary"
                    required={true}
                    {...register('taxId')}
                    />
                </div>
                <div className="mt-4">
                    <button className="create-button">Create</button>
                </div>
            </form>
        </div>
    )
}