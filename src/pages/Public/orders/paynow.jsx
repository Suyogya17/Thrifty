import axios from "axios";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../../components/Footer/footer";
import Navbar from "../../../components/Navbar/navbar";

const PayNow = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/order/${orderId}`);
        setOrder(res.data);

        // Generate QR code linking to payment confirmation page
        const qrText = `http://localhost:5173/pay-confirmation/${orderId}`;
        const url = await QRCode.toDataURL(qrText);
        setQrUrl(url);
      } catch (err) {
        toast.error("Failed to load order details");
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  // Handle the payment button click: update status and navigate
  const handlePayment = async () => {
    try {
      toast.info("Processing payment...");
      // Call API to update payment status to "paid"
      await axios.put(`http://localhost:3000/api/order/payment-status/${orderId}`, {
        status: "paid",
      });
      toast.success("Payment successful!");
      navigate("/cart");
    } catch (err) {
      toast.error("Failed to update payment status.");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading order...</div>;
  if (!order) return null;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Pay for Your Order</h2>

        <div className="mb-4">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Amount:</strong> Rs {order.totalAmount}</p>
          <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => {
              const product = item.product;
              if (!product) {
                return <p key={index} className="text-red-500">Product not found (deleted).</p>;
              }

              return (
                <div key={index} className="flex gap-4 items-center border-b pb-4">
                  <img
                    src={`http://localhost:3000/uploads/${product.image}`}
                    alt={product.productName}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{product.productName}</p>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="text-sm">Type: {item.type}</p>
                    <p className="text-sm">Price: Rs {item.price}</p>
                    {item.type === "rent" && (
                      <p className="text-sm text-blue-600">
                        Rent Duration: {item.rentDurationDays} {item.rentDurationDays > 1 ? "days" : "day"}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {qrUrl && (
          <div className="text-center mt-6">
            <h3 className="text-xl font-semibold mb-2">Scan to Pay</h3>
            <img src={qrUrl} alt="QR Code" className="mx-auto w-56 h-56" />
            <p className="text-sm text-gray-500 mt-2">Scan this QR code using another device</p>

            <div className="mt-4">
              <p className="text-sm text-gray-600">or</p>
              <a
                href={`http://localhost:5173/pay-confirmation/${orderId}`}
                className="text-blue-600 underline text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tap here to pay from your phone
              </a>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={handlePayment}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PayNow;
