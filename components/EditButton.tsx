interface EditButtonProps {
    id: string;
    handleEdit: (id: string) => void;
};

export default function DeleteButton({ id, handleEdit }:  EditButtonProps ) {
    return (
        <button 
            className="bg-yellow-300 px-2 py-1 rounded-lg text-white"
            onClick={() => handleEdit(id)}
        >
           แก้ไข 
        </button>
    )

};