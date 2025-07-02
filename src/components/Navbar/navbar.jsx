import { useEffect, useRef, useState } from "react";
import { FaFilter, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const dropdownRef = useRef(null);
  const filterRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id");
    window.location.href = "/";
  };

  return (
    <div className="w-full shadow-md">
      {/* Top Navbar */}
      <div className="bg-black px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Thrifty
        </div>

        {/* Menu Links */}
        <div className="hidden md:flex space-x-10 gap-3 font-medium text-white">
          <a href="/category/men" className="hover:text-purple-600">
            Men
          </a>
          <a href="/category/women" className="hover:text-purple-600">
            Women
          </a>
          <a href="/category/kid" className="hover:text-purple-600">
            Kids
          </a>
          <a href="/category/sale" className="hover:text-purple-600">
            Sale
          </a>
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
        <div className="flex items-center gap-8 text-xl text-white relative">
          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <FaUser
              className="cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg z-50 py-2">
                <a
                  href="/account"
                  className="block px-4 py-2 hover:bg-purple-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  Account
                </a>
                <a
                  href="/add-product"
                  className="block px-4 py-2 hover:bg-purple-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  Add Product
                </a>
                <a
                  href="/my-product"
                  className="block px-4 py-2 hover:bg-purple-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Products
                </a>
                <a
                  href="/my-donation"
                  className="block px-4 py-2 hover:bg-purple-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Donation
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-purple-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <FaHeart className="cursor-pointer" />

          {/* Cart icon with navigation */}
          <FaShoppingCart
            className="cursor-pointer"
            onClick={() => navigate("/cart")}
          />
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="text-black px-4 py-2 flex flex-wrap gap-6 text-sm font-medium items-center bg-white relative">
        {/* Filter button and dropdown */}
        {/* <div className="relative" ref={filterRef}> */}
          {/* <div
            className="flex items-center gap-2 cursor-pointer hover:text-purple-600 select-none"
            onClick={() => setFilterOpen((prev) => !prev)}
          >
            <FaFilter />
            <span>Filter</span>
          </div> */}

          {/* {filterOpen && (
            <div className="absolute top-full mt-1 left-0 bg-white border rounded shadow-lg p-4 w-48 z-50">
              {/* Example filter options */}
              {/* <h4 className="font-semibold mb-2">Filter Options</h4> */}
              {/* <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="newArrivals" />
                  New Arrivals
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="onSale" />
                  On Sale
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="popular" />
                  Popular
                </label>
              </div> */}
            {/* </div>
          )}
        </div> */} 

        {/* <button
          onClick={() => navigate("/dashboard")}
          className="hover:text-purple-600"
        >
          Browse
        </button> */}
        <button
          onClick={() => navigate("/rent")}
          className="hover:text-purple-600"
        >
          Rent
        </button>
        <button
          onClick={() => navigate("/sell")}
          className="hover:text-purple-600"
        >
          Sell
        </button>
        <button
          onClick={() => navigate("/buy")}
          className="hover:text-purple-600"
        >
          Buy
        </button>
        <button
          onClick={() => navigate("/donate")}
          className="hover:text-purple-600"
        >
          Donate
        </button>
      </div>
    </div>
  );
}
