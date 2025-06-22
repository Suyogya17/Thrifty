import Footer from "../../../components/Footer/footer";
import Hero from "../../../components/Hero/hero";
import Navbar1 from "../../../components/Navbar/navbar1";
import ProductCard from "../../../components/ProductCard/product";


// Example product data (can be fetched from an API later)
const products = [
  {
    id: 1,
    image: "https://i.pinimg.com/736x/8c/bc/6c/8cbc6c55bc4dc974a6971149d9fa29f7.jpg",
    name: "Casual Shirt",
    rating: 4.2,
    price: 799,
    description: "A cool casual shirt for everyday wear.",
  },
  {
    id: 2,
    image: "https://i.pinimg.com/736x/d9/7e/2b/d97e2bb5be41b03fd669cab3a8ec4862.jpg",
    name: "Denim Jacket",
    rating: 4.8,
    price: 1499,
    description: "Trendy denim jacket with a modern fit.",
  },
  {
    id: 3,
    image: "https://i.pinimg.com/736x/38/0f/fe/380ffe23add20a4a765e68554034ebe8.jpg",
    name: "T-shirt",
    rating: 4.5,
    price: 1299,
    description: "Perfect t-shirt for summer.",
  },
];

const Landing = () => {
  return (
    <>
      <Navbar1/>
      <Hero />

      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Featured Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                rating={product.rating}
                price={product.price}
                description={product.description}
                onBuyClick={() => alert(`Buying ${product.name}`)}
                onRentClick={() => alert(`Renting ${product.name}`)}
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

// And replace the usage: -----------------

// <ProductContainer
//   key={product.id}
//   image={product.image}
//   name={product.name}
//   rating={product.rating}
//   price={product.price}
//   buttonText="Rent"
//   onButtonClick={() => alert(`Renting ${product.name}`)}
// />
