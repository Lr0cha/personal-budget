import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const response = await fetch("http://localhost:8081/auth/login", {
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
          }, 1000);
        },
      });
    } catch (error) {
      toast.error("Erro ao realizar login. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-right" autoClose={1000} />
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
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
              {errors.username && (
                <p className="mt-2 text-red-700 text-sm">{errors.username}</p>
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
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
              {errors.password && (
                <p className="mt-2 text-red-700 text-sm">{errors.password}</p>
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
