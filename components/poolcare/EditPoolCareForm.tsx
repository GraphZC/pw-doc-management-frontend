'use client'

import { Pool } from "@/interface/Pool"
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";

interface EditPoolFormProps {
    data: Pool;
    handleUpdate: (data: Pool) => void;
}

export default function EditPoolForm({ data, handleUpdate }: EditPoolFormProps) {
    const {register, handleSubmit } = useForm<Pool>({defaultValues: data});
    return (
        <div>
                <div className="mt-4">
                    <SubmitButton text="แก้ไข" />
                </div>
        </div>
    )
}


