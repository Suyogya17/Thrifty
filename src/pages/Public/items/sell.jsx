import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import Navbar from "../../../components/Navbar/navbar";

export default function SellItems() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellItems = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/product/type/sell");
        const data = Array.isArray(res.data) ? res.data : [];
        setItems(data);
      } catch (err) {
        console.error("Error fetching sell items:", err);
        setError("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };

    fetchSellItems();
  }, []);

  useEffect(() => {
    const filtered = items.filter((item) => {
      const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase());
      const price = Number(item.price);
      const inPriceRange = price >= minPrice && price <= maxPrice;
      return matchesSearch && inPriceRange;
    });
    setFilteredItems(filtered);
  }, [items, searchQuery, minPrice, maxPrice]);

  const handleBuy = (item) => {
    navigate("/order", { state: { item } });
  };

  if (loading) return <p className="text-center mt-10">Loading items...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
          <h2 className="text-3xl font-bold text-purple-700">Products for Sale</h2>

          <input
            type="text"
            placeholder="Search by name..."
            className="border rounded px-4 py-2 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <FaFilter />
            <span>Filter</span>
          </button>
        </div>

        {showFilter && (
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="text-lg font-semibold mb-3">Filter Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Min Price (Rs): <span className="font-bold">{minPrice}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="100"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Max Price (Rs): <span className="font-bold">{maxPrice}</span>
                </label>
                <input
                  type="range"
                  min={minPrice}
                  max="100000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transition"
              >
                <img
                  src={
                    item.image
                      ? `http://localhost:3000/uploads/${item.image}`
                      : "/placeholder.png"
                  }
                  alt={item.productName}
                  className="w-full h-60 object-fit"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.png";
                  }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{item.productName}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <p className="text-green-600 font-bold text-lg mb-3">Rs {item.price}</p>
                  <button
                    onClick={() => handleBuy(item)}
                    className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-8">
              No items match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
