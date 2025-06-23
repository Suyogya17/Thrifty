import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/Footer/footer";

const OrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  if (!product) return <div className="text-center mt-10">Product not found</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <img src={`http://localhost:3000/uploads/${product.image}`} alt={product.productName} className="w-1/3 h-80 object-cover rounded-md mb-6" />
        <h2 className="text-2xl font-bold mb-2">{product.productName}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-purple-600 font-bold mb-6">Rs {product.price}</p>

       <button
  onClick={() => {
    const tax = product.price * 0.13;
    const delivery = 100;
    const total = product.price + tax + delivery;

    navigate("/checkout", {
      state: {
        product,
        summary: {
          basePrice: product.price,
          taxAmount: tax,
          deliveryCharge: delivery,
          totalAmount: total,
        },
      },
    });
  }}
  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
>
  Add to Cart
</button>
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;
