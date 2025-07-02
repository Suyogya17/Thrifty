import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        toast.warn("Please login to view your wishlist.");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/api/wishlist/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWishlistItems(res.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [navigate]);

  const handleRemove = async (productId) => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.warn("Please login to modify your wishlist.");
      navigate("/login");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/wishlist/removeFromWishlist/${userId}/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Removed from wishlist!");
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove item.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading wishlist...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 text-center">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Your wishlist is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded shadow">
              <thead>
                <tr className="bg-black text-white text-left">
                  <th className="py-3 px-6">Image</th>
                  <th className="py-3 px-6">Product Name</th>
                  <th className="py-3 px-6">Price (Rs)</th>
                  <th className="py-3 px-6">Category</th>
                  <th className="py-3 px-6">Condition</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <img
                        src={`http://localhost:3000/uploads/${product.image}`}
                        alt={product.productName}
                        className="h-16 w-16 object-cover rounded"
                        onClick={() => navigate(`/product/${product._id}`)}
                      />
                    </td>
                    <td
                      className="py-4 px-6 font-semibold text-purple-700"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      {product.productName}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">{product.price}</td>
                    <td className="py-4 px-6">{product.category}</td>
                    <td className="py-4 px-6">{product.condition}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(product._id);
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default WishlistPage;
