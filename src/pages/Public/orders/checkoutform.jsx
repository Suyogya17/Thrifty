import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/Footer/footer";
import { createOrder } from "../../Public/orders/query";

const CheckoutPage = () => {
  const { state } = useLocation(); // { product, summary }
  const navigate = useNavigate();

  const product = state?.product;
  const summary = state?.summary;

  const [form, setForm] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "cash",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const customerId = localStorage.getItem("id"); // Ensure you have stored user id here

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");

    try {
      if (!customerId) throw new Error("User not logged in.");

      const orderData = {
        credential: customerId,
        items: [
          {
            product: product._id,
            price: product.price,
            rentDurationDays: null,
            type: "buy",
          },
        ],
        status: "pending",
        totalAmount: summary.totalAmount,
        shippingAddress: {
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
        paymentStatus: "pending",
        paymentMethod: form.paymentMethod,
      };

      await createOrder(orderData);
      alert("Order placed successfully!");
      navigate("/cart"); // Redirect to orders page or thank you page
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!product || !summary)
    return <div className="text-center mt-10">Missing order data</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {/* Product Preview */}
        <div className="mb-6 border p-4 rounded">
          <img
            src={`http://localhost:3000/uploads/${product.image}`}
            alt={product.productName}
            className="h-48 object-cover rounded mb-3"
          />
          <h3 className="text-xl font-semibold">{product.productName}</h3>
          <p className="text-gray-700">{product.description}</p>
          <p className="font-bold text-purple-600">Rs {product.price}</p>
        </div>

        {/* Shipping Form */}
        <div className="mb-6 space-y-3">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <input
            name="addressLine1"
            placeholder="Address Line 1"
            value={form.addressLine1}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="addressLine2"
            placeholder="Address Line 2"
            value={form.addressLine2}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="cash">Cash on Delivery</option>
            <option value="esewa">eSewa</option>
            <option value="khalti">Khalti</option>
            <option value="stripe">Stripe</option>
          </select>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h3 className="text-lg font-medium mb-2">Order Summary</h3>
          <div className="flex justify-between">
            <span>Base Price:</span>
            <span>Rs {summary.basePrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (13%):</span>
            <span>Rs {summary.taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>Rs {summary.deliveryCharge}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold text-xl">
            <span>Total:</span>
            <span>Rs {summary.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded text-lg"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
