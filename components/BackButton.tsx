'use client'
interface BackButtonProps {
    url: string;
};

import Link from "next/link";
import { useRouter } from "next/navigation"

export default function BackButton({ url }: BackButtonProps) {
    return (
        <Link 
            href={url}
            className="text-blue-600 mb-2 inline-block hover:underline"
        >
            &#60; Back
        </Link>
    )

}