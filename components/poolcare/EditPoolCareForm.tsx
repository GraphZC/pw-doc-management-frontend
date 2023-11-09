'use client'

import { Pool } from "@/interface/Pool"
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import { Customer } from "@/interface/Customer";
import PoolType from "@/enum/PoolType";

interface EditPoolFormProps {
    data: Pool;
    customers: Customer[];
    handleUpdate: (data: Pool) => void;
}

export default function EditPoolForm({ data, handleUpdate, customers }: EditPoolFormProps) {
    const {register, handleSubmit, reset, formState} = useForm<Pool>({defaultValues: data});
    return (
        <div>
            <form onSubmit={handleSubmit(handleUpdate)}>

                <div className="mb-2">
                    <label htmlFor="customer">ลูกค้า</label>
                    <select 
                        id="customer"
                        className="input-primary"
                        required={true}
                        {...register('customerId')}
                    >
                       {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                       ))} 
                    </select>
                </div>
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
                        {...register('chemicalIncluded')}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="poolType">ประเภทสระ</label>
                    <select
                        id="poolType"
                        className="input-primary"
                        required={true}
                        {...register('type')}
                    >
                        <option value={PoolType.CHLORINE}>สระครอรีน</option>
                        <option value={PoolType.SALT}>สระเกลือ</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label htmlFor="inService">อยู่ในการดูแล</label>
                    {/* Checkbox */}
                    <input
                        type="checkbox"
                        id="inService"
                        className="ml-2 px-5 py-[10px] rounded-md cursor-pointer border-gray-300"
                        {...register('inService')}
                    />
                </div>
                <div className="mb-2 mt-4">วันที่ดูแล</div>
                <div className="mb-2 flex gap-7 text-center">
                    <div>
                        <label htmlFor="monday">จันทร์</label>
                        <input 
                            type="checkbox"
                            id="monday"
                            className="px-5 py-[10px] rounded-md cursor-pointer border-gray-300 flex checked:bg-yellow-300 checked:outline-yellow-300 hover:outline-yellow-300 focus:outline-yellow-300"
                            {...register('serviceDay.monday')}
                        />
                    </div>
                    <div>
                        <label htmlFor="tuesday">อังคาร</label>
                        <input 
                            type="checkbox"
                            id="tuesday"
                            className="px-5 py-[10px] rounded-md cursor-pointer border-gray-300 flex checked:bg-pink-400 checked:outline-pink-400 hover:outline-pink-400 focus:outline-pink-400"
                            {...register('serviceDay.tuesday')}
                        />
                    </div>
                    <div>
                        <label htmlFor="wednesday">พุธ</label>
                        <input 
                            type="checkbox"
                            id="wednesday"
                            className="px-5 py-[10px] rounded-md cursor-pointer border-gray-300 flex checked:bg-green-500 checked:outline-green-500 hover:outline-green-500 focus:outline-green-500"
                            {...register('serviceDay.wednesday')}
                        />
                    </div>
                    <div>
                        <label htmlFor="thursday">พฤหัส</label>
                        <input 
                            type="checkbox"
                            id="thursday"
                            className="px-5 py-[10px] rounded-md cursor-pointer border-gray-300 flex checked:bg-orange-500 checked:outline-orange-500 hover:outline-orange-500 focus:outline-orange-500"
                            {...register('serviceDay.thursday')}
                        />
                    </div>
                    <div>
                        <label htmlFor="friday">ศุกร์</label>
                        <input 
                            type="checkbox"
                            id="friday"
                            className="px-5 py-[10px] rounded-md cursor-pointer border-gray-300 flex checked:bg-blue-500 checked:outline-blue-500 hover:outline-blue-500 focus:outline-blue-500"
                            {...register('serviceDay.friday')}
                        />
                    </div>
                    <div>
                        <label htmlFor="saturday">เสาร์</label>
                        <input 
                            type="checkbox"
                            id="saturday"
                            className="px-5 py-[10px] rounded-md cursor-pointer border-gray-300 flex checked:bg-purple-400 checked:outline-purple-400 hover:outline-purple-400 focus:outline-purple-400"
                            {...register('serviceDay.saturday')}
                        />
                    </div>
                    <div>
                        <label htmlFor="sunday">อาทิตย์</label>
                        <input 
                            type="checkbox"
                            id="sunday"
                            className="px-5 py-[10px] rounded-md cursor-pointer border-gray-300 flex checked:bg-red-500 checked:outline-red-500 hover:outline-red-500 focus:outline-red-500"
                            {...register('serviceDay.sunday')}
                        />
                    </div>
                </div>
                
                <div className="mt-6">
                    <SubmitButton text="แก้ไข" />
                </div>
            </form>
        </div>
    )
}


