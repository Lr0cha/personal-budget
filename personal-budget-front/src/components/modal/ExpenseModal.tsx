import { useState, useEffect } from "react";
import "./styles.css";
import { expenseProps, categoryMap } from "../../types";

interface ExpenseModalProps {
  isOpen: boolean;
  isEdit: boolean;
  onClose: () => void;
  editExpense?: expenseProps | null;
  onSave: (expense: expenseProps) => void;
}

const ExpenseModal = ({
  isOpen,
  isEdit,
  onClose,
  editExpense,
  onSave,
}: ExpenseModalProps) => {
  const [expenseData, setExpenseData] = useState<expenseProps>({
    id: editExpense?.id ? editExpense.id : undefined,
    description: editExpense?.description || "",
    amount: editExpense?.amount || "",
    expenseType: editExpense?.expenseType || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const formErrors: Record<string, string> = {};

    if (
      expenseData.description === undefined ||
      expenseData.description.length < 4
    ) {
      formErrors.description = "Descrição deve ter no mínimo 4 caracteres";
    }
    if (
      expenseData.amount === undefined ||
      parseFloat(expenseData.amount) < 0
    ) {
      formErrors.amount = "Valor inválido";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length > 0;
  };

  const clearInputs = () => {
    setExpenseData({ description: "", amount: "", expenseType: "" });
  };

  useEffect(() => {
    clearInputs();
    if (editExpense) {
      setExpenseData({
        id: editExpense.id,
        description: editExpense.description,
        amount: editExpense.amount,
        expenseType: editExpense.expenseType,
      });
    }
  }, [editExpense]);

  const handleSave = () => {
    if (validateForm()) return;
    onSave(expenseData);
    onClose();
    clearInputs();
  };

  return isOpen ? (
    <div className="modal-container">
      <div className="overlay"></div>
      <div className="modal">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {isEdit ? "Editar valor da Despesa" : "Adicionar Despesa"}
        </h3>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Descrição</label>
          <input
            type="text"
            value={expenseData.description}
            onChange={(e) =>
              setExpenseData({
                ...expenseData,
                description: e.target.value,
              })
            }
            className={`w-full p-2 border border-gray-300 rounded-md ${
              isEdit ? "bg-neutral-100" : "bg-white"
            }`}
            readOnly={isEdit}
          />
          {errors.description && (
            <p className="mt-2 text-red-700 text-sm">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Categoria</label>
          <select
            value={expenseData.expenseType}
            onChange={(e) =>
              setExpenseData({
                ...expenseData,
                expenseType: e.target.value,
              })
            }
            className={`w-full p-2 border border-gray-300 rounded-md ${
              isEdit ? "bg-neutral-100" : "bg-white"
            }`}
            required
            disabled={isEdit}
          >
            <option value="" disabled>
              Selecione...
            </option>
            {Object.keys(categoryMap).map((key) => (
              <option key={key} value={key}>
                {categoryMap[key]}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Valor</label>
          <input
            type="text"
            value={expenseData.amount}
            onChange={(e) =>
              setExpenseData({
                ...expenseData,
                amount: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.amount && (
            <p className="mt-2 text-red-700 text-sm">{errors.amount}</p>
          )}
        </div>
        {errors.amount && (
          <p className="mt-2 text-red-700 text-sm">{errors.amount}</p>
        )}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {isEdit ? "Salvar Alterações" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ExpenseModal;
