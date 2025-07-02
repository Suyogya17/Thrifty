// Landing.jsx
import { useNavigate } from "react-router-dom";
import { useGetItems } from "../items/query"; // adjust path if needed

import Footer from "../../../components/Footer/footer";
import Hero from "../../../components/Hero/hero";
import Navbar from "../../../components/Navbar/navbar";
import ProductCard from "../../../components/ProductCard/product";

const Landing = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetItems();

  if (isLoading) return <p className="text-center mt-10">Loading products...</p>;
  if (isError) return <p className="text-center mt-10">Error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <Hero />

      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Featured Products</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((product) => (
              <ProductCard
  key={product._id}
  productId={product._id} // ✅ This is required
  image={`http://localhost:3000/uploads/${product.image}`}
  name={product.productName}
  rating={product.rating || 4.5}
  price={product.price}
  description={product.description}
  onBuyClick={() => navigate("/order", { state: { product } })}
  onRentClick={() => navigate("/order", { state: { product } })}
/>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Landing;
