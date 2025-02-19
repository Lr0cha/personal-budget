// src/pages/Dashboard.tsx
import Navbar from "../components/Navbar";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseModal from "../components/modal/ExpenseModal";
import { useState } from "react";

const Dashboard = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [expense, setExpense] = useState({
    category: "",
    description: "",
    amount: "",
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="p-4 mt-18">
        <header className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Total de Despesas
            </h2>
            <p className="text-2xl text-green-600 font-bold">R$ 2,500.00</p>
            <p className="text-sm text-gray-500 ">Mês: Fevereiro 2025</p>
          </div>
          <button
            onClick={() => {
              setModalOpen(true);
              setIsEdit(false);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-500"
          >
            Adicionar Despesa
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ExpenseCard
            category="Alimentação"
            description="Supermercado"
            amount="350,00"
            onEdit={() =>
              setExpense({
                ...expense,
                amount: "350,00",
              })
            }
            onDelete={() => {}}
          />
          <ExpenseCard
            category="Transporte"
            description="Uber"
            amount="80,00"
            onEdit={() =>
              setExpense({
                ...expense,
                amount: "50,00",
              })
            }
            onDelete={() => {}}
          />
          <ExpenseCard
            category="Lazer"
            description="Cinema"
            amount="50,00"
            onEdit={() =>
              setExpense({
                ...expense,
                amount: "150,00",
              })
            }
            onDelete={() => {}}
          />
        </div>

        <ExpenseModal
          isOpen={modalOpen}
          isEdit={isEdit}
          onClose={() => setModalOpen(false)}
          editExpense={expense}
        />
      </main>
    </div>
  );
};

export default Dashboard;
