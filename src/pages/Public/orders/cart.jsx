import { useEffect, useState } from "react";
import Footer from "../../../components/Footer/footer";
import Navbar from "../../../components/Navbar/navbar";
import { getOrdersByCustomer } from "../../Public/orders/query";

const CartPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const customerId = localStorage.getItem("id");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getOrdersByCustomer(customerId);
        setOrders(result);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  if (loading) return <div className="text-center mt-10">Loading your cart...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border rounded p-4 shadow">
                <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                <p className="text-sm">Status: <span className="font-medium">{order.status}</span></p>

                <div className="mt-4 space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="border-t pt-4 flex gap-4 items-center">
                      <img
                        src={`http://localhost:3000/uploads/${item.product.image}`}
                        alt={item.product.productName}
                        className="h-24 w-24 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.product.productName}</p>
                        <p className="text-sm text-gray-600">{item.product.description}</p>
                        <p className="text-sm">Type: {item.type}</p>
                        <p className="text-sm font-medium">Rs {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="font-bold mt-4 text-right">Total: Rs {order.totalAmount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
