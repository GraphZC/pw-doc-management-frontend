'use client'

import { CreateEmployee } from "@/interface/CreateEmployee";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import { EmployeeRole } from "@/enum/EmployeeRole";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

interface CreateEmployeeFormProps {
    handleCreate: (data: CreateEmployee) => void;
}
const formSchema = yup.object({
    name: yup.string()
        .required('กรุณากรอกชื่อ'),
    role: yup.string()
        .required('กรุณาเลือกตำแหน่ง'),
    username: yup.string()
        .required('กรุณากรอกชื่อผู้ใช้'),
    password: yup.string()
        .required('กรุณากรอกรหัสผ่าน')
        .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
    confirmPassword: yup.string()
        .required('กรุณากรอกยืนยันรหัสผ่าน')
        .oneOf([yup.ref('password')], 'รหัสผ่านไม่ตรงกัน'),
});
type FormData = yup.InferType<typeof formSchema>;

export default function CreateEmployeeForm({ handleCreate }: CreateEmployeeFormProps) {
    const {register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }} = useForm({
        resolver: yupResolver(formSchema),
    });
    const handleCreateEmployee = (data: FormData) => {
        handleCreate(data as CreateEmployee);
    }
    useEffect(() => {
        if(isSubmitSuccessful){
            reset();
        }
    },[isSubmitSuccessful, reset])

    return (
        <div>
            <form onSubmit={handleSubmit(handleCreateEmployee)}>
                <div className="mb-2">
                    <label htmlFor="name">ชื่อ</label>
                    <input
                    type="text"
                    id="name"
                    className="input-primary"
                    required={true}
                    {...register('name')}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div className="mb-2">
                    <label htmlFor="role">ตำแหน่ง</label>
                    <select 
                    id="role" 
                    className="input-primary"
                    {...register('role')}>
                        <option value={ EmployeeRole.EMPLOYEE }>พนักงานทั่วไป</option>
                        <option value={ EmployeeRole.ADMIN }>ผู้ดูแล</option>
                    </select>
                    {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor="username">ชื่อผู้ใช้</label>
                    <input
                    type="text"
                    id="username"
                    className="input-primary"
                    required={true}
                    {...register('username')}
                    />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                </div>

                <div className="mb-2">
                    <label htmlFor="password">รหัสผ่าน</label>
                    <input
                    type="password"
                    id="password"
                    className="input-primary"
                    required={true}
                    {...register('password')}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor="confirm_password">ยืนยันรหัสผ่าน</label>
                    <input
                    type="password"
                    id="confirm_password"
                    className="input-primary"
                    required={true}
                    {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                </div>
                <div className="mt-4">
                    <SubmitButton text="สร้าง" />
                </div>
            </form>
        </div>
    )
}

