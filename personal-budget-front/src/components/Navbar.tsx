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
        <p className="ml-2 text-xl font-bold text-gray-800">
          Budget<span className="text-green-700">Ease</span>
        </p>
      </div>
      <div className="flex items-center space-x-6">
        <button
          onClick={handleLogout}
          className="bg-green-600 px-6 py-2 rounded-md hover:bg-green-500 text-white font-medium cursor-pointer"
        >
          Sair
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
