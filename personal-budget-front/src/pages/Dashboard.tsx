import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ExpenseCards from "../components/ExpenseCards";
import ExpenseModal from "../components/modal/ExpenseModal";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import { expenseProps } from "../types";
import { toast, ToastContainer } from "react-toastify";
import { CurrentMonthYearDisplay, formatCurrency } from "../util/formatter";
import { BASE_URL } from "../types";

const Dashboard = () => {
  const token = sessionStorage.getItem("token");
  const [expenses, setExpenses] = useState<expenseProps[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<expenseProps | null>(
    null
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateSessionStorage = (data: expenseProps[]) => {
    sessionStorage.setItem("budgetData", JSON.stringify(data));
    setExpenses(data);
  };

  const getExpenses = async () => {
    try {
      const response = await fetch(`${BASE_URL}api/v1/despesas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        updateSessionStorage(data);
        setLoading(false);
      } else {
        toast.error("Erro ao buscar despesas.");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Erro no servidor, tente novamente!");
      setLoading(false);
    }
  };

  const handleEditExpense = (expense: expenseProps) => {
    setIsEdit(true);
    setSelectedExpense(expense);
    setModalOpen(true);
  };

  const handleDeleteExpense = (expense: expenseProps) => {
    setSelectedExpense(expense);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}api/v1/despesas/${selectedExpense?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        toast.success("Despesa excluída com sucesso.");
        const updatedExpenses = expenses.filter(
          (expense) => expense.id !== selectedExpense?.id
        );
        updateSessionStorage(updatedExpenses);
        setDeleteModalOpen(false);
      } else {
        toast.error("Erro ao excluir a despesa.");
      }
    } catch (error) {
      toast.error("Erro ao excluir a despesa.");
    }
  };

  const handleSaveExpense = async (expense: expenseProps) => {
    const method = isEdit ? "PATCH" : "POST";
    const url = isEdit
      ? `${BASE_URL}api/v1/despesas/${expense.id}`
      : `${BASE_URL}api/v1/despesas`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expense),
      });
      if (response.status === 201 || response.status === 204) {
        toast.success(isEdit ? "Despesa atualizada!" : "Despesa adicionada!");
        getExpenses();
        setModalOpen(false);
      } else {
        toast.error("Erro ao salvar a despesa.");
      }
    } catch (error) {
      toast.error("Erro no servidor. Tente novamente!");
    }
  };

  useEffect(() => {
    const savedExpenses = sessionStorage.getItem("budgetData");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    } else {
      setLoading(true);
      getExpenses();
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={800} />
      <div className="h-18">
        <Navbar actualPage="DASHBOARD" />
      </div>
      <main className="p-4">
        <header className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Total de Despesas
            </h2>
            <p className="text-2xl text-green-600 font-bold">
              {formatCurrency(
                expenses.reduce(
                  (total, expense) => total + parseFloat(expense.amount),
                  0
                )
              )}
            </p>

            <div>
              <CurrentMonthYearDisplay />
            </div>
          </div>

          <button
            onClick={() => {
              setModalOpen(true);
              setIsEdit(false);
              setSelectedExpense(null);
            }}
            className="px-4 py-2 font-medium bg-green-600 text-white rounded-md shadow-md hover:bg-green-500 cursor-pointer"
          >
            Adicionar Despesa
          </button>
        </header>

        <div>
          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="flex items-center">
                <div className="animate-spin border-t-4 border-neutral-700 border-solid rounded-full w-12 h-12 mr-2"></div>
                <h2 className="text-3xl font-medium text-gray-500 mt-2">
                  Carregando...
                </h2>
              </div>
            </div>
          ) : (
            <ExpenseCards
              expenses={expenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          )}
        </div>

        <ExpenseModal
          isOpen={modalOpen}
          isEdit={isEdit}
          onClose={() => setModalOpen(false)}
          editExpense={selectedExpense}
          onSave={handleSaveExpense}
        />

        <ConfirmDeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </main>
    </div>
  );
};

export default Dashboard;
