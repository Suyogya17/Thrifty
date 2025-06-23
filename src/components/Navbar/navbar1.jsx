// components/Navbar/navbar.jsx
import { FaFilter, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleProtectedRoute = (path) => {
    if (!isLoggedIn) {
      toast.info("Please log in to continue");
      navigate("/sign-in");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-full shadow-md">
      {/* Top Navbar */}
      <div className="bg-black px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          THRIFTY
        </div>

        {/* Menu Links */}
        <div className="hidden md:flex space-x-10 gap-3 font-medium text-white">
          <span className="hover:text-purple-600 cursor-pointer">Men</span>
          <span className="hover:text-purple-600 cursor-pointer">Women</span>
          <span className="hover:text-purple-600 cursor-pointer">Kids</span>
          <span className="hover:text-purple-600 cursor-pointer">Sale</span>
          <span className="hover:text-purple-600 cursor-pointer">Trending</span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block w-1/5">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-purple-700-300 rounded-full px-4 py-1 focus:outline-none"
          />
        </div>

        {/* Icons */}
        <div className="flex gap-4 text-white text-lg">
          <FaShoppingCart
            className="cursor-pointer hover:text-purple-300"
            onClick={() => navigate("/cart")}
          />
          <FaHeart
            className="cursor-pointer hover:text-purple-300"
            onClick={() => navigate("/wishlist")}
          />
          <FaUser
            className="cursor-pointer hover:text-purple-300"
            onClick={() => navigate(isLoggedIn ? "/profile" : "/sign-in")}
          />
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="text-black px-4 py-2 flex flex-wrap gap-6 text-sm font-medium items-center bg-white">
        <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
          <FaFilter />
          <span>Filter</span>
        </div>

        <span
          onClick={() => handleProtectedRoute("/rent")}
          className="hover:text-purple-600 cursor-pointer"
        >
          Rent
        </span>
        <span
          onClick={() => handleProtectedRoute("/sell")}
          className="hover:text-purple-600 cursor-pointer"
        >
          Sell
        </span>
        <span
          onClick={() => handleProtectedRoute("/buy")}
          className="hover:text-purple-600 cursor-pointer"
        >
          Buy
        </span>
        <span
          onClick={() => handleProtectedRoute("/donate")}
          className="hover:text-purple-600 cursor-pointer"
        >
          Donate
        </span>

        {!isLoggedIn && (
          <button
            onClick={() => navigate("/sign-up")}
            className="ml-auto bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
}
