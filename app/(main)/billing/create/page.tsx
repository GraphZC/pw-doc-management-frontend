'use client'

import useCreateBill from "@/api/bill/useCreateBill";
import useCustomer from "@/api/customer/useAllCustomers";
import useProduct from "@/api/product/useAllProducts";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import CreateBillForm from "@/components/bill/CreateBillForm";
import { CustomerOrder } from "@/interface/CustomerOrder";
import { Purchase } from "@/interface/Purchase";
import { useSession } from "next-auth/react";

export default function CreateBillingPage() {
    const { isPending: isPendingCustomer, error: errorCustomer, data: customers } = useCustomer();
    const { isPending: isPendingProduct, error: errorProduct, data: products } = useProduct();
    const { data: session, status } = useSession();
    const createBill = useCreateBill();

    if (isPendingCustomer || isPendingProduct || status === 'loading') { 
        return <div>Loading...</div> 
    }

    if (errorCustomer || errorProduct) { 
        return <div> { (errorCustomer || errorProduct)?.message }</div> 
    }

    const handleCreate = async (data: CustomerOrder) => {
        data.purchase?.map((p: Purchase) => {
            console.log(p)
        })
        createBill.mutate(data);
    }

    return (
        <div>
            <BackButton url="/billing" />
            <PageHeader title="สร้างบิล"/>
            <CreateBillForm
                customer={customers!}
                product={products!}
                session={session!}
                handleCreate={handleCreate}
            />
        </div>
    )
}