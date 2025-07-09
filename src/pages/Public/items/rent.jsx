import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/navbar";
import { useGetItemsByType } from "./query";

export default function RentProducts() {
  const navigate = useNavigate();
  const { data, isError, error, isLoading } = useGetItemsByType("rent");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [showFilter, setShowFilter] = useState(false);

  // For rent days modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rentDays, setRentDays] = useState(1);

  const products = Array.isArray(data) ? data : [];

  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      Number(product.price) >= minPrice &&
      Number(product.price) <= maxPrice
  );

  const openRentModal = (product) => {
    setSelectedProduct(product);
    setRentDays(1);
  };

  const closeRentModal = () => {
    setSelectedProduct(null);
  };

  const confirmRental = () => {
    if (rentDays < 1) return alert("Please enter a valid number of days (min 1).");

    const totalPrice = rentDays * selectedProduct.price;

    // Navigate to order page with product, rentDays and totalPrice
    navigate("/rent-form", {
      state: {
        product: selectedProduct,
        rentDays,
        totalPrice,
      },
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading products...</p>;
  if (isError) return <p className="text-center mt-10">Error: {error.message}</p>;

  return (
    <div className="h-full min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="container mx-auto p-6 mt-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-3xl font-bold text-purple-700">Products for Rent</h2>

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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg flex flex-col justify-between overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={`http://localhost:3000/uploads/${product.image}`}
                  alt={product.productName}
                  className="w-full h-60 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.png"; // fallback image
                  }}
                />
                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{product.productName}</h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600 mb-2">Rs {product.price} / day</p>
                    <button
                      className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                      onClick={() => openRentModal(product)}
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full mt-10">
              No products available for rent.
            </p>
          )}
        </div>
      </div>

      {/* Modal for selecting rent days */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Rent "{selectedProduct.productName}"</h3>

            <label className="block mb-2 font-medium" htmlFor="rentDays">
              Number of days to rent:
            </label>
            <input
              id="rentDays"
              type="number"
              min="1"
              value={rentDays}
              onChange={(e) => setRentDays(Number(e.target.value))}
              className="border rounded px-3 py-2 w-full mb-4"
            />

            <p className="mb-4 text-lg">
              Price per day: <span className="font-bold">Rs {selectedProduct.price}</span>
            </p>
            <p className="mb-6 text-lg">
              Total Price: <span className="font-bold">Rs {rentDays * selectedProduct.price}</span>
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={closeRentModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmRental}
                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              >
                Confirm Rental
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
