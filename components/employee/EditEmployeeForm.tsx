'use client'

import { Employee } from "@/interface/CreateEmployee"
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import { watch } from "fs";
import { get } from "http";

interface EditEmployeeFormProps {
    data: Employee;
    handleUpdate: (data: Employee) => void;
}

export default function EditEmployeeForm({ data, handleUpdate }: EditEmployeeFormProps) {
    const {register, handleSubmit } = useForm<Employee>({defaultValues: data});
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
                    <label htmlFor="username">username</label>
                    <input
                    type="text"
                    id="username"
                    className="input-primary"
                    required={true}
                    {...register('username')}
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
                    <SubmitButton text="แก้ไข" />
                </div>
            </form>
        </div>
    )
}

