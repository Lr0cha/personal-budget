// src/components/ExpenseCard.tsx
import { FaTrash, FaEdit } from "react-icons/fa";

interface ExpenseCardProps {
  category: string;
  description: string;
  amount: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpenseCard = ({
  category,
  description,
  amount,
  onEdit,
  onDelete,
}: ExpenseCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm text-gray-500">{category}</div>
        <div className="text-lg font-semibold text-green-600">R$ {amount}</div>
      </div>
      <div className="text-gray-700 mb-3">{description}</div>
      <div className="flex justify-between">
        <button onClick={onEdit} className="text-blue-600 hover:scale-110">
          <FaEdit />
        </button>
        <button onClick={onDelete} className="text-red-600 hover:scale-110">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
