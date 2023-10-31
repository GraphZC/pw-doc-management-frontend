interface PageHeaderProps {
    title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
    return (
        <div className="mb-5">
            <h1 className="font-medium text-xl">{ title }</h1>
        </div>
    )
}