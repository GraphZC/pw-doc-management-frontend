import MySwal, { warningAlert } from "@/lib/sweetAlert";

interface DeleteButtonProps {
    id: string;
    handleDelete: (id: string) => void;
};

export default function DeleteButton({ id, handleDelete }:  DeleteButtonProps) {
    const deleteConfirm = (id: string) => {
        warningAlert({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            onConfirm: () => handleDelete(id),
        });

    }
    return (
        <button 
            className="bg-red-500 px-2 py-1 rounded-lg text-white"
            onClick={() => deleteConfirm(id)}
        >
           ลบ
        </button>
    )

};