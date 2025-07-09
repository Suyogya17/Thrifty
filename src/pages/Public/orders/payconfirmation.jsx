import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/Footer/footer";

const PayConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        // 1. Fetch order to confirm it's valid
        const res = await axios.get(`http://localhost:3000/api/order/${orderId}`);
        setOrder(res.data);

        // 2. Update payment status to "paid"
        await axios.put(`http://localhost:3000/api/order/payment-status/${orderId}`, {
          status: "paid",
        });

        toast.success("Payment confirmed successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to confirm payment");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [orderId]);

  if (loading) return <div className="text-center mt-10">Processing payment...</div>;

  if (!order) return <div className="text-center mt-10">Order not found</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Payment Confirmed ✅</h1>
        <p className="text-lg mb-2">Order ID: {order._id}</p>
        <p className="text-lg font-medium text-green-700">Amount Paid: Rs {order.totalAmount}</p>
        <p className="text-sm text-gray-500 mt-4">Thank you for your purchase!</p>

        <button
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
      <Footer />
    </>
  );
};

export default PayConfirmation;
