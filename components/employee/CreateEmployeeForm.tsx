'use client'

import { Employee } from "@/interface/createEmployee";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";

interface CreateEmployeeFormProps {
    handleCreate: (data: Employee) => void;
}

export default function CreateEmployeeForm({ handleCreate }: CreateEmployeeFormProps) {
    const {register, handleSubmit, reset, watch, formState} = useForm<Employee>();

    useEffect(() => {
        if(formState.isSubmitSuccessful){
            reset();
        }
    },[formState, reset])
    return (
        <div>
            <form onSubmit={handleSubmit(handleCreate)}>
                <div className="mb-2">
                    <label htmlFor="username">username</label>
                    <input
                    type="text"
                    id="username"
                    className="input-primary"
                    required={true}
                    {...register('username')}
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
                    <label htmlFor="roles">ตำแหน่ง</label>
                    <select 
                    id="roles" 
                    className="input-primary"
                    {...register('roles')}>
                        <option value="ROLE_USER">User</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label htmlFor="password">password</label>
                    <input
                    type="password"
                    id="password"
                    className="input-primary"
                    required={true}
                    {...register('password')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="confirm_password">confirm password</label>
                    <input
                    type="password"
                    id="confirm_password"
                    className="input-primary"
                    required={true}
                    {...register('confirm_password')}
                    />
                </div>
                <div className="mt-4">
                    <SubmitButton text="สร้าง" />
                </div>
            </form>
        </div>
    )
}

