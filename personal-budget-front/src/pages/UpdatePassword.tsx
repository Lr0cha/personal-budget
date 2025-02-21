import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";

const UpdatePassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-right" autoClose={800} />
      <Navbar actualPage="UPDATE_PASSWORD" />
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-20">
        <h2 className="text-xl text-center font-medium mb-4">
          Mudança de senha
        </h2>
        <form>
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
              value={"João"}
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
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Nova senha
            </label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
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
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
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
