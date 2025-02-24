import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { BASE_URL } from "../types";
import { formatCurrency, formatMonthYear } from "../util/formatter";

interface FetchData {
  totalAmount: number;
  groupedMonthExpenses: {
    [key: string]: number;
  };
}

const Report = () => {
  const token = sessionStorage.getItem("token");
  let averageValue: number;
  const [fetchData, setFetchData] = useState<FetchData>({
    totalAmount: 0,
    groupedMonthExpenses: {},
  });
  const [loading, setLoading] = useState(false);

  const getReports = async () => {
    try {
      const response = await fetch(`${BASE_URL}api/v1/relatorios`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setFetchData({
          totalAmount: data.totalAmount,
          groupedMonthExpenses: data.groupedMonthExpenses,
        });
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Erro ao buscar relatórios.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      setLoading(true);
      getReports();
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  const groupedData = Object.entries(fetchData.groupedMonthExpenses).map(
    ([month, value]) => ({
      month,
      value,
    })
  );

  averageValue = fetchData.totalAmount
    ? fetchData.totalAmount / groupedData.length
    : 0;

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={800} />
      <div className="h-18">
        <Navbar actualPage="REPORTS" />
      </div>
      <main className="p-4">
        <header className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-700">
              Total de Despesas
            </h2>
            <p className="text-2xl text-green-600 font-bold">
              {formatCurrency(fetchData.totalAmount)}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-700">
              Total médio mensal
            </h2>
            <p className="text-2xl text-green-600 font-bold">
              {formatCurrency(averageValue)}
            </p>
          </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {groupedData.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-medium uppercase text-gray-500">
                      {formatMonthYear(item.month)}
                    </span>
                    <span className="text-xl text-green-600 font-bold">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-full ${
                        item.value <= averageValue
                          ? "bg-green-500"
                          : "bg-red-500"
                      }  rounded-full`}
                      style={{
                        width: `${(item.value / fetchData.totalAmount) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Report;
