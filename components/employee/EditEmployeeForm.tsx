'use client'

import { CreateEmployee } from "@/interface/CreateEmployee"
import { Employee } from "@/interface/Employee"
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { EmployeeRole } from "@/enum/EmployeeRole";

interface EditEmployeeFormProps {
    data: Employee;
    handleUpdate: (data: Employee) => void;
}

const formSchema = yup.object({
    name: yup.string()
        .required('กรุณากรอกชื่อ'),
    role: yup.string()
        .required('กรุณาเลือกตำแหน่ง'),
    username: yup.string()
        .required('กรุณากรอกชื่อผู้ใช้'),
    // if password not empty, validate password min 8 char
    password: yup.string().test(
        'empty-or-8-characters-check',
        'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
        password => !password || password.length >= 8,
    ),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'รหัสผ่านไม่ตรงกัน'),
});
type FormData = yup.InferType<typeof formSchema>;

export default function EditEmployeeForm({ data, handleUpdate }: EditEmployeeFormProps) {
    data.password = '';
    const {register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: data as any,
        resolver: yupResolver(formSchema),
    });
    const handleUpdateEmployee = (data: FormData) => {
        handleUpdate(data as CreateEmployee);
    }


    return (
        <div>
            <form onSubmit={handleSubmit(handleUpdateEmployee)}>
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
                    <label htmlFor="username">ชื่อผู้ใช้</label>
                    <input
                    type="text"
                    id="username"
                    className="input-primary"
                    required={true}
                    {...register('username')}
                    readOnly
                    />
                    { errors.username && <p className="text-red-500">{errors?.username.message as unknown as string}</p>}
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
                    {errors.name && <p className="text-red-500">{errors.name.message  as unknown as string}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor="roles">ตำแหน่ง</label>
                    <select 
                    id="roles" 
                    className="input-primary"
                    {...register('role')}>
                        <option value={ EmployeeRole.EMPLOYEE }>พนักงานทั่วไป</option>
                        <option value={ EmployeeRole.ADMIN }>ผู้ดูแล</option>
                    </select>
                    {errors.role && <p className="text-red-500">{errors.role.message  as unknown as string}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor="password">รหัสผ่าน</label>
                    <input
                    type="password"
                    id="password"
                    className="input-primary"
                    {...register('password')}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message  as unknown as string}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
                    <input
                    type="password"
                    id="confirmPassword"
                    className="input-primary"
                    {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message  as unknown as string}</p>}
                </div>
                <div className="mt-4">
                    <SubmitButton text="แก้ไข" />
                </div>
            </form>
        </div>
    )
}

