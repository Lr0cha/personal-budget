import { useState } from "react";
import { FaWallet, FaExclamationCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../types";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const validateForm = () => {
    const formErrors: Record<string, string> = {};

    if (formData.username.length < 3) {
      formErrors.username = "Username deve ter no mínimo 3 caracteres";
    }
    if (formData.password.length < 6) {
      formErrors.password = "Senha deve ter entre 6 e 8 caracteres";
    }
    if (formData.password.length > 8) {
      formErrors.password = "Senha deve ter entre 6 e 8 caracteres";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length > 0;
  };

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (validateForm()) return;
    getDataLogin();
  }

  const getDataLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      sessionStorage.setItem("token", data.token);

      toast.success("Login realizado com sucesso!", {
        onClose: () => {
          setTimeout(() => {
            navigate("/");
          }, 500);
        },
      });
    } catch (error) {
      toast.error("Erro ao realizar login. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-right" autoClose={800} />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <FaWallet className="text-4xl text-green-600" />
        </div>
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-4">
          BudgetEase
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nome de usuário
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className={`w-full p-3 mt-2 border rounded-md ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } focus:ring-green-500 focus:border-green-500`}
                required
              />
              {errors.username && (
                <div className="text-red-500 flex items-center mt-1">
                  <FaExclamationCircle className="mr-2" />
                  {errors.username}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full p-3 mt-2 border rounded-md ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:ring-green-500 focus:border-green-500`}
                required
              />

              {errors.password && (
                <div className="text-red-500 flex items-center mt-1">
                  <FaExclamationCircle className="mr-2" />
                  {errors.password}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </form>
        </div>
        <div className="mt-4 text-center text-gray-600">
          <span>
            Não tem uma conta?{" "}
            <Link
              to="/register"
              className="text-green-600 hover:text-green-700"
            >
              Registre-se
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
