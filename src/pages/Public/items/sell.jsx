import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../components/Navbar/navbar";

export default function SellItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleBuy = (item) => {
    navigate("/order", { state: { item } });
  };

  if (loading) return <p className="text-center mt-10">Loading items...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Items for Sale</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.length > 0 ? (
            items
              .filter(Boolean)
              .map((item, index) => (
                <div
                  key={item?._id || index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                >
                  <img
                    src={
                      item.image
                        ? `http://localhost:3000/uploads/${item.image}`
                        : "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={item?.productName || "Product"}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1">
                      {item?.productName || "Unnamed Product"}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item?.description || "No description provided."}
                    </p>
                    <p className="text-green-600 font-bold text-lg">Rs {item?.price}</p>

                    <button
                      onClick={() => handleBuy(item)}
                      className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No items available for sale.</p>
          )}
        </div>
      </div>
    </div>
  );
}
