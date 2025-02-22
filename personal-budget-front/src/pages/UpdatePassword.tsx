import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaExclamationCircle } from "react-icons/fa";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [username, setUsername] = useState("");
  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = sessionStorage.getItem("token");

  const validateForm = () => {
    const formErrors: Record<string, string> = {};

    if (passwordData.password.length < 6 || passwordData.password.length > 8) {
      formErrors.currentPassword = "A senha deve ter entre 6 e 8 caracteres.";
    }
    if (
      passwordData.newPassword.length < 6 ||
      passwordData.newPassword.length > 8
    ) {
      formErrors.newPassword = "A nova senha deve ter entre 6 e 8 caracteres.";
    }
    if (passwordData.confirmPassword !== passwordData.newPassword) {
      formErrors.confirmPassword = "As senhas não coincidem.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length > 0;
  };

  const getUsername = async () => {
    try {
      const response = await fetch(`${BASE_URL}api/v1/usuarios`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setUsername(data.username);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Erro ao buscar o usuário.");
    }
  };

  const postUpdatePassword = async () => {
    try {
      if (validateForm()) {
        return;
      }
      const response = await fetch(`${BASE_URL}api/v1/usuarios`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          currentPassword: passwordData.password,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        }),
      });
      if (response.status === 204) {
        toast.success("Senha atualizada com sucesso");
        navigate("/");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Erro ao mudar a senha. Tente novamente!");
    }
  };

  function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    postUpdatePassword();
  }

  useEffect(() => {
    if (token) {
      getUsername();
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-right" autoClose={800} />
      <Navbar actualPage="UPDATE_PASSWORD" />
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-20">
        <h2 className="text-xl text-center font-medium mb-4">
          Mudança de senha
        </h2>
        <form onSubmit={handleUpdatePassword}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              readOnly={true}
            />
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
              value={passwordData.password}
              onChange={(e) => {
                setPasswordData({
                  ...passwordData,
                  password: e.target.value,
                });
              }}
              className={`w-full p-2 mt-2 border rounded-md ${
                errors.currentPassword ? "border-red-500" : "border-gray-300"
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

          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              Nova senha
            </label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              value={passwordData.newPassword}
              onChange={(e) => {
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                });
              }}
              className={`w-full p-2 mt-2 border rounded-md ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } focus:ring-green-500 focus:border-green-500`}
              required
            />
            {errors.newPassword && (
              <div className="text-red-500 flex items-center mt-1">
                <FaExclamationCircle className="mr-2" />
                {errors.newPassword}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar senha
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={passwordData.confirmPassword}
              onChange={(e) => {
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                });
              }}
              className={`w-full p-2 mt-2 border rounded-md ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:ring-green-500 focus:border-green-500`}
              required
            />
            {errors.confirmPassword && (
              <div className="text-red-500 flex items-center mt-1">
                <FaExclamationCircle className="mr-2" />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Mudar senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
