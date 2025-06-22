import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetItemsByType } from "./query";
import Navbar from "../../../components/Navbar/navbar"; // ✅ Adjust path based on your structure

export default function RentItems() {
  const navigate = useNavigate();
  const { data, isError, error, isLoading } = useGetItemsByType("rent");

  const items = Array.isArray(data) ? data : [];

  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [showFilter, setShowFilter] = useState(false);

  const handleOrder = (item) => {
    navigate("/order", { state: { item } });
  };

  const filteredItems = items.filter((item) => {
    return (
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      Number(item.price) >= minPrice &&
      Number(item.price) <= maxPrice
    );
  });

  if (isLoading) return <p className="text-center mt-10">Loading items...</p>;
  if (isError) return <p className="text-center mt-10">Error: {error.message}</p>;

  return (
    <div className="h-full min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="container mx-auto p-6 mt-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-3xl font-bold">Items for Rent</h2>

          <input
            type="text"
            placeholder="Search by name..."
            className="border rounded-lg px-4 py-2 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FaFilter className="text-xl" />
            <span>Filter</span>
          </button>
        </div>

        {showFilter && (
          <div className="bg-white shadow-md rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">Filter Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Min Price (Rs): <span className="font-bold">{minPrice}</span>
                </label>
                <input
                  type="range"
                  className="w-full"
                  min="0"
                  max={maxPrice}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  step="100"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Max Price (Rs): <span className="font-bold">{maxPrice}</span>
                </label>
                <input
                  type="range"
                  className="w-full"
                  min={minPrice}
                  max="100000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  step="100"
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={`http://localhost:3000/uploads/${item.image}`}
                  alt={item.productName}
                  className="w-full h-80 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.png"; // fallback image
                  }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.productName}</h3>
                  <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                  <p className="text-lg font-bold text-green-600">Rs {item.price}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
                      onClick={() => handleOrder(item)}
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full mt-10">
              No items available for rent.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
