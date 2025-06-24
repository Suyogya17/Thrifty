import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spline from "@splinetool/react-spline";

import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/product/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  if (!product) return <div className="p-6 text-center">Loading product...</div>;

  // Handler for Buy button
  const handleBuy = () => {
    navigate("/order", { state: { product, action: "buy" } });
  };

  // Handler for Rent button
  const handleRent = () => {
    navigate("/order", { state: { product, action: "rent" } });
  };

  return (
    <>
      <Navbar />

      <div className="px-6 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow-lg">
          {/* Product Image */}
          <div className="w-full h-full">
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              alt={product.productName}
              className="w-full h-[400px] object-cover rounded-lg border"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.productName}</h1>
              <p className="text-gray-600 mt-4">{product.description}</p>

              <div className="mt-6 space-y-2">
                <p className="text-xl font-semibold text-purple-600">Rs {product.price}</p>
                <p className="text-sm text-gray-700">
                  Type: <span className="font-medium">{product.type}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Condition: <span className="font-medium">{product.condition}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Category: <span className="font-medium">{product.category}</span>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleRent}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
              >
                Rent
              </button>
              <button
                onClick={handleBuy}
                className="flex-1 bg-pink-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 transition"
              >
                Buy
              </button>
            </div>

            {/* Preview toggle button */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg text-lg font-medium hover:opacity-90 transition"
            >
              {showPreview ? "Hide 3D Preview" : "Preview in 3D"}
            </button>
          </div>
        </div>

        {/* 3D Preview Section */}
        {showPreview && (
          <div className="mt-10 rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner">
            <Spline scene="https://prod.spline.design/FmtBpfaI82IPOPER/scene.splinecode" />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
