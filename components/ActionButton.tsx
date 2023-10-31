import DeleteButton from "./DeleteButton";

interface ActionButtonProps {
    id: number;
    handleDelete: (id: number) => void;
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