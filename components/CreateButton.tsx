import Link from "next/link";

interface CreateButtonProps {
    url: string;
};

export default function CreateButton({ url }: CreateButtonProps) {
    return (
        <Link 
            href={url}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block"
        >
            + สร้าง
        </Link>
    )
}