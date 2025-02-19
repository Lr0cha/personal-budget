import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white text-black fixed top-0 left-0 right-0 p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <FaWallet className="h-8 w-8 text-green-500 " />
        <span className="ml-2 text-xl font-bold text-gray-800">BudgetEase</span>
      </div>
      <div className="flex items-center space-x-6">
        <span>Olá, João</span>
        <button
          onClick={handleLogout}
          className="bg-green-600 px-6 py-2 rounded-md hover:bg-green-500 text-white"
        >
          Sair
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
