import { useState } from "react";
import { FaWallet, FaUser } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { valuesMenu } from "../types";

interface navbarProps {
  actualPage: string;
}

const Navbar = ({ actualPage }: navbarProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("budgetData");
    navigate("/login");
  };

  const menuItems = Object.keys(valuesMenu).filter((key) => key !== actualPage);

  return (
    <nav className="bg-white text-black fixed top-0 left-0 right-0 p-4 flex justify-between items-center shadow-md h-19">
      <div className="flex items-center">
        <FaWallet className="h-8 w-8 text-green-500" />
        <p className="ml-2 text-xl font-bold text-gray-800">
          Budget<span className="text-green-700">Ease</span>
        </p>
      </div>
      <div className="flex items-center space-x-6 relative">
        <button
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
          className="bg-green-600 px-6 py-2 rounded-md hover:bg-green-500 text-white font-medium cursor-pointer flex items-center mr-4"
        >
          <FaUser className="mr-2" />
          Conta
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-44 bg-green-600 shadow-lg rounded-md w-40">
            <ul className="space-y-0.5 py-1">
              {menuItems.map((key) => (
                <li key={key} className="text-center">
                  <Link
                    to={valuesMenu[key].path}
                    className="block px-4 py-2 text-white hover:bg-green-500 rounded-md border-b border-white"
                  >
                    {valuesMenu[key].text}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-white hover:bg-green-500 rounded-md text-center"
                >
                  Sair
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
