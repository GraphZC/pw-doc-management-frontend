import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface ActionButtonProps {
    id: string;
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
}

export default function ActionButton({
    id,
    handleDelete,
    handleEdit,
}: ActionButtonProps) {
    return (
        <div className="flex gap-2">
            <EditButton
            id={id}
            handleEdit={handleEdit}
            />
            <DeleteButton
                id={id} 
                handleDelete={handleDelete}
            />
        </div>
    )
}