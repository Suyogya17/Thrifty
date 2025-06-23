import { useEffect, useState } from "react";
import Footer from "../../../components/Footer/footer";
import Navbar from "../../../components/Navbar/navbar";
import { getOrdersByCustomer, deleteOrder, updateOrder } from "../../Public/orders/query";

const CartPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const customerId = localStorage.getItem("id");

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await getOrdersByCustomer(customerId);
      setOrders(result);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [customerId]);

  // Delete order handler
  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await deleteOrder(orderId);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      alert("Failed to delete order.");
      console.error(err);
    }
  };

  // Update order handler - example: cancel order
  const handleCancel = async (orderId) => {
    try {
      const updated = await updateOrder(orderId, { status: "cancelled" });
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? updated.data : order))
      );
    } catch (err) {
      alert("Failed to update order.");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading your cart...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isCancelable = order.status === "pending" || order.status === "confirmed";

              return (
                <div key={order._id} className="border rounded p-4 shadow">
                  <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                  <p className="text-sm">
                    Status: <span className="font-medium">{order.status}</span>
                  </p>

                  <div className="mt-4 space-y-4">
                    {order.items.map((item, index) => {
                      const product = item.product;
                      if (!product) {
                        return (
                          <div key={index} className="text-red-500">
                            Product not found (maybe deleted).
                          </div>
                        );
                      }
                      return (
                        <div key={index} className="border-t pt-4 flex gap-4 items-center">
                          <img
                            src={`http://localhost:3000/uploads/${product.image}`}
                            alt={product.productName}
                            className="h-24 w-24 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold">{product.productName}</p>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <p className="text-sm">Type: {item.type}</p>
                            <p className="text-sm font-medium">Rs {item.price}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p className="font-bold mt-4 text-right">Total: Rs {order.totalAmount}</p>

                  <div className="mt-4 flex gap-3 justify-end">
                    {isCancelable && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Cancel Order
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
