// src/components/ExpenseModal.tsx
import { useState } from "react";
import "./styles.css";

interface ExpenseModalProps {
  isOpen: boolean;
  isEdit: boolean;
  onClose: () => void;
  editExpense: any;
}

const ExpenseModal = ({
  isOpen,
  isEdit,
  onClose,
  editExpense,
}: ExpenseModalProps) => {
  const [description, setDescription] = useState(
    editExpense?.description || ""
  );
  const [amount, setAmount] = useState(editExpense?.amount || "");
  const [category, setCategory] = useState(editExpense?.category || "");

  const handleSave = () => {
    onClose();
  };

  return isOpen ? (
    <div className="modal-container">
      <div className="overlay"></div>

      <div className="modal">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {isEdit ? "Editar Despesa" : "Adicionar Despesa"}
        </h3>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Valor</label>
          <input
            type="number"
            min={0.01}
            step={0.01}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecione uma opção...</option>
            <option value="FOOD">Alimentação</option>
            <option value="TRANSPORT">Transporte</option>
            <option value="HEALTH">Saúde</option>
            <option value="ENTERTAINMENT">Lazer</option>
            <option value="RENT">Aluguel</option>
            <option value="OTHER">Outros</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            {editExpense ? "Salvar Alterações" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ExpenseModal;
