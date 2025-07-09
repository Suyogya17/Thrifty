import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import shared components
import Footer from "../../../components/Footer/footer";
import Navbar from "../../../components/Navbar/navbar";

export default function RentOrderForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;
  const rentDaysFromState = location.state?.rentDays || 1;
  const userId = localStorage.getItem("id");

  const [rentDays, setRentDays] = useState(rentDaysFromState);
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!product)
    return <p className="text-center mt-10 text-red-600">Product info not found!</p>;

  const totalPrice = rentDays * product.price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userId) {
      setError("User not logged in.");
      return;
    }

    if (!addressLine1 || !city || !postalCode || !country) {
      setError("Please complete all required address fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        credential: userId,
        items: [
          {
            product: product._id,
            price: product.price,
            rentDurationDays: rentDays,
            type: "rent",
          },
        ],
        totalAmount: totalPrice,
        shippingAddress: {
          addressLine1,
          addressLine2,
          city,
          postalCode,
          country,
        },
        paymentStatus: "pending",
        paymentMethod,
      };

      const res = await axios.post("http://localhost:3000/api/order/create", payload);

      if (res.data.message === "Order created successfully") {
        toast.success("Order placed successfully!");
        setTimeout(() => navigate("/cart"), 2000);
      } else {
        toast.error("Failed to place order.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" />

      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded flex flex-col md:flex-row gap-6">
        {/* Left: Product Info */}
        <div className="w-full md:w-1/2">
          <img
            src={`http://localhost:3000/uploads/${product.image}`}
            alt={product.productName}
            className="w-full h-64 object-contain rounded border"
            onError={(e) => (e.target.src = "/placeholder.png")}
          />
          <h2 className="text-2xl font-bold mt-4">{product.productName}</h2>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="mt-3 text-green-700 font-semibold">Rs {product.price} / day</p>
          <p className="text-lg font-bold mt-2">
            Total: Rs {product.price} × {rentDays} days = Rs {totalPrice}
          </p>
        </div>

        {/* Right: Rent Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2">
          <label className="block mb-2 font-medium">Rent Days</label>
          <input
            type="number"
            min="1"
            value={rentDays}
            onChange={(e) => setRentDays(Number(e.target.value))}
            className="w-full border rounded px-3 py-2 mb-4"
            required
          />

          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <input
            placeholder="Address Line 1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2"
            required
          />
          <input
            placeholder="Address Line 2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2"
          />
          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2"
            required
          />
          <input
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2"
            required
          />
          <input
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            required
          />

          <label className="block mb-2 font-medium">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
          >
            <option value="cash">Cash</option>
            <option value="esewa">eSewa</option>
            <option value="khalti">Khalti</option>
            <option value="stripe">Stripe</option>
          </select>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            {loading ? "Placing Order..." : "Place Rent Order"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
