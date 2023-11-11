'use client'

import { Customer } from "@/interface/Customer";
import { CustomerOrder } from "@/interface/CustomerOrder";
import { Product } from "@/interface/Product";
import { Session } from "next-auth";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface CreateBillFormProps {
    handleCreate: (data: CustomerOrder) => void;
    customer: Customer[];
    product: Product[];
    session: Session
}

export default function CreateBillForm({
    handleCreate, customer, product, session
}: CreateBillFormProps) {

    const { register, handleSubmit, control } = useForm<CustomerOrder>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'purchase',
    });

    return (
        <div>
            <form onSubmit={handleSubmit(handleCreate)}>
                <input
                    type="hidden"
                    {...register('employeeId', { value: session.user?.id })}
                />
                <div className="mb-2">
                    <label htmlFor="customer">ลูกค้า</label>
                    <select
                        id="customer"
                        className="input-primary"
                        required={true}
                        {...register('customerId')}
                    >
                        {customer.map((customer) => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </select>                    
                </div>
                <div className="mb-2">
                    <label htmlFor="product">รายการสินค้า</label>
                    { fields.map((field, index) => {
                        return (
                            <div key={field.id} className="flex mb-3 gap-3">
                                <label htmlFor="product" className="my-auto">สินค้า</label>
                                <select
                                    id="product"
                                    className="input-primary"
                                    required={true}
                                    {...register(`purchase.${index}.productId`)}
                                >
                                    {product.map((product) => (
                                        <option key={product.id} value={product.id}>{product.name} @ {product.price} บาท</option>
                                    ))}
                                </select>
                                <label htmlFor="quantity" className="my-auto">จำนวน</label>
                                <input
                                    type="number"
                                    className="input-primary"
                                    required={true}
                                    {...register(`purchase.${index}.quantity`)}
                                />
                                <button
                                    type="button"
                                    className="px-4 py-1 bg-red-500 text-white rounded-lg"
                                    onClick={() => remove(index)}
                                >
                                    ลบ
                                </button>
                            </div>
                        )
                    }) }
                    <div className="mb-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-green-500 text-white rounded-lg"
                            onClick={() => append({ quantity: 1 })}
                        >
                            &#43; เพิ่มสินค้า
                        </button>
                    </div>
                    <div className="mt-2 flex gap-2">
                        <input
                            id="vatIncluded"
                            type="checkbox"
                            className="px-5 py-[10px] rounded-md cursor-pointer border-gray-300 flex"
                            {...register('invoice.vatIncluded')}
                        />
                        <label htmlFor="vatIncluded">รวมภาษีมูลค่าเพิ่ม</label>

                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full mt-2"
                        >
                            ออกใบแจ้งหนี้
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}