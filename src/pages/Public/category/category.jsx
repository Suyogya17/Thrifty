import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../../components/Footer/footer";
import Navbar from "../../../components/Navbar/navbar";
import ProductCard from "../../../components/ProductCard/product";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/api/product/category/${categoryName}`)

      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) return <p className="text-center mt-10">Loading {categoryName} products...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (products.length === 0) return <p className="text-center mt-10">No products found in {categoryName}.</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 capitalize">{categoryName} Products</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <ProductCard
              key={product._id}
              productId={product._id}
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
      <Footer />
    </>
  );
};

export default CategoryPage;
