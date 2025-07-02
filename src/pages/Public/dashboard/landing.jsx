import { useNavigate } from "react-router-dom";
import { useGetItems } from "../items/query"; // Adjust path if needed

import Footer from "../../../components/Footer/footer";
import Hero from "../../../components/Hero/hero";
import Navbar1 from "../../../components/Navbar/navbar1";
import ProductCard from "../../../components/ProductCard/product";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Landing = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetItems();

  const isLoggedIn = !!localStorage.getItem("user");

  if (isLoading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10">Error: {error.message}</p>;
  }

  const handleAccessDenied = () => {
    toast.warning("Please login to continue!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  };

  return (
    <>
      <Navbar1 />
      <Hero />

      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Featured Products</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                image={`http://localhost:3000/uploads/${product.image}`}
                name={product.productName}
                rating={product.rating || 4.5}
                price={product.price}
                description={product.description}
                onBuyClick={() => {
                  if (!isLoggedIn) {
                    handleAccessDenied();
                  } else {
                    navigate("/order", { state: { product } });
                  }
                }}
                onRentClick={() => {
                  if (!isLoggedIn) {
                    handleAccessDenied();
                  } else {
                    navigate("/order", { state: { product } });
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default Landing;
