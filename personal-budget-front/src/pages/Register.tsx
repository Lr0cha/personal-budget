import { FaWallet } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <FaWallet className="text-4xl text-green-600" />
        </div>
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-4">
          Registre uma conta
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <form>
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
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
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
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar a senha
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Cadastrar
            </button>
          </form>
        </div>
        <div className="mt-4 text-center text-gray-600">
          <span>
            Já tem uma conta?{" "}
            <Link to="/login" className="text-green-600 hover:text-green-700">
              Faça login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
