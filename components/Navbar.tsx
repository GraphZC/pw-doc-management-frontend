'use client'

import Link from 'next/link';
import Profile from './Profile';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from 'public/imgs/poolworld-logo.png';

interface NavbarItemProps {
    href: string;
    text: string;
    currentPath: string;
}

function NavbarItem({ href, text, currentPath } : NavbarItemProps) {
    const isActive = currentPath.includes(href);
    return (
        <div className="w-full">
            <Link
                href={href}
                className={ `block w-full py-2 px-4 mb-2 ${isActive && 'font-medium bg-gray-100'} text-gray-700 rounded-lg hover:bg-gray-100` }
            >
                { text }
            </Link>
        </div>
    )
}

export default function Navbar() {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    return (
        <nav className='bg-white h-screen border-r py-5 px-3 border-gray-200 sticky top-0 col-span-1 self-start'>
            <div className='font-bold text-center text-lg pb-3 flex justify-center gap-2'>
                <Image 
                    src={Logo}
                    width={30}
                    height={30}
                    alt='Poolworld'
                />
                <div>
                    Poolworld
                </div>
            </div>
            <div className='mb-3'>
                <Profile name={session?.user?.name} role={session?.user?.role} />
            </div>
            <NavbarItem href="/dashboard" text="Dashboard" currentPath={pathname} />
            <NavbarItem href="/employee" text="พนักงาน" currentPath={pathname} />
            <NavbarItem href="/customer" text="ลูกค้า" currentPath={pathname} />
            <NavbarItem href="/product" text="สินค้า" currentPath={pathname} />
            <NavbarItem href="/poolcare" text="ใบดูแลสระ" currentPath={pathname} />
            <NavbarItem href="/billing" text="จัดการบิล" currentPath={pathname} />
        </nav>
    )
}