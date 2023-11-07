import PageHeader from "@/components/PageHeader";
import A4Component from "@/components/poolcare/A4component";
import { PreviewA4 } from "@diagoriente/react-preview-a4";

export default function PoolCare() {
    return (
        <>
            <PageHeader title="เพิ่มสระว่ายน้ำ" />
            <div>
                <A4Component />
            </div>
        </>
    )
}