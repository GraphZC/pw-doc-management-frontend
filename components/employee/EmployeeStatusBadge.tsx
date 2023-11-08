import { EmployeeRole } from '@/enum/EmployeeRole';

interface EmployeeStatusBadgeProps {
    status: EmployeeRole;
}

interface RoleMap {
    [key: string]: {
        textColor: string;
        bgColor: string;
        text: string;
    }
}

export default function EmployeeStatusBadge({ 
    status 
}: EmployeeStatusBadgeProps) {

    const roleMap: RoleMap = {
        [EmployeeRole.ADMIN]: { 
            textColor: 'text-white',
            bgColor: 'bg-blue-500',
            text: 'ผู้ดูแลระบบ',
        },
        [EmployeeRole.EMPLOYEE]: {
            textColor: 'text-white',
            bgColor: 'bg-green-500',
            text: 'พนักงานทั่วไป',
        },
    }


    return (
        <div>
            <span className={ `inline-block px-2 rounded-full text-sm ${roleMap[status].textColor} ${roleMap[status].bgColor}` }>
                { roleMap[status].text }
            </span>
        </div>
    );
}