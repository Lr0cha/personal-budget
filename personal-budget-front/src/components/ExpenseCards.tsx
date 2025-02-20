import { FaTrash, FaEdit } from "react-icons/fa";
import { expenseProps } from "../types";
import { formatCurrency } from "../util/formatter";

interface ExpenseCardProps {
  expenses: expenseProps[];
  onEdit: (expense: expenseProps) => void;
  onDelete: (expense: expenseProps) => void;
}

const ExpenseCards = ({ expenses, onEdit, onDelete }: ExpenseCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {expenses.length > 0 &&
        expenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-md font-medium text-gray-500">
                {expense.expenseType}
              </span>
              <div className="text-lg font-semibold text-green-600">
                {formatCurrency(parseFloat(expense.amount))}
              </div>
            </div>
            <div className="text-gray-700 mb-3">{expense.description}</div>
            <div className="flex justify-between">
              <button
                onClick={() => onEdit(expense)}
                className="text-blue-600 hover:scale-110"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(expense)}
                className="text-red-600 hover:scale-110"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ExpenseCards;
