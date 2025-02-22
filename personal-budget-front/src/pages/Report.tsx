import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
const Report = () => {
  //teste
  const data = [
    { month: "Janeiro", value: 550.0 },
    { month: "Fevereiro", value: 430.0 },
    { month: "Março", value: 520.0 },
    { month: "Abril", value: 600.0 },
    { month: "Maio", value: 800.0 },
    { month: "Junho", value: 470.0 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={800} />
      <div className="h-18">
        <Navbar actualPage="REPORTS" />
      </div>
      <main className="p-4">
        <header className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Total de Despesas
            </h2>
            <p className="text-2xl text-green-600 font-bold">R$ 1500,00</p>
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl text-gray-700">{item.month}</span>
                <span className="text-xl text-green-600 font-bold">
                  R${item.value.toFixed(2)}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(item.value / 1500) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Report;
