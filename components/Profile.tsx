interface ProfileProps {
    name?: string;
    role?: string;
}

export default function Profile({ name, role }: ProfileProps) {
    const roleTh = role === "ADMIN" ? 'ผู้ดูแลระบบ' : 'พนักงาน';
    return (
        <div className='text-center border border-gray-200 rounded-lg px-2 py-1'>
            <h1><span className='font-normal'>{ name }</span></h1>
            <h2 className='bg-blue-500 inline-block px-2 rounded-full text-white text-sm'>{ roleTh }</h2>
        </div>
    )
}