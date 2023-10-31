import DeleteButton from "./DeleteButton";

interface ActionButtonProps {
    id: string;
    handleDelete: (id: string) => void;
}

export default function ActionButton({
    id,
    handleDelete,
}: ActionButtonProps) {
    return (
        <div>
            <DeleteButton
                id={id} 
                handleDelete={handleDelete}
            />
        </div>
    )
}