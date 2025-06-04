import { FaFilter, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="w-full shadow-md">
      {/* Top Navbar */}
      <div className="bg-black px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white cursor-pointer"  onClick={() => window.location.reload()}>Thrifty</div>

        {/* Menu Links */}
        <div className="hidden md:flex space-x-10 gap-3 font-medium text-white">
             <a href="#" className="hover:text-purple-600">Men</a> 
             <a href="#" className="hover:text-purple-600">Women</a> 
             <a href="#" className="hover:text-purple-600">Kids</a> 
             <a href="#" className="hover:text-purple-600">Sale</a> 
             <a href="#" className="hover:text-purple-600">Trending</a> 
             </div>

        {/* Search Bar */}
        <div className="hidden md:block w-1/5">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-full px-4 py-1 focus:outline-none"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-8 text-xl text-white">
          <FaUser className="cursor-pointer" />
          <FaHeart className="cursor-pointer" />
          <FaShoppingCart className="cursor-pointer" />
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className=" text-black px-4 py-2 flex gap-10 text-sm font-medium">
        <div className="flex items-center gap-1">
          <FaFilter />
        
        </div>
        <a href="#"  className="hover:text-purple-600">Browse</a>
        <a href="#"  className="hover:text-purple-600">Rent</a>
        <a href="#"  className="hover:text-purple-600">Sell</a>
        <a href="#"  className="hover:text-purple-600">Buy</a>
        <a href="#"  className="hover:text-purple-600">Donate</a>
      </div>
    </div>
  );
}
