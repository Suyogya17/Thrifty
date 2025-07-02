import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../../../components/Footer/footer";
import Navbar from "../../../components/Navbar/navbar";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    productName: "",
    price: "",
    description: "",
    category: "",
    type: "",
    condition: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product data on mount
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setForm({
          productName: res.data.productName,
          price: res.data.price,
          description: res.data.description,
          category: res.data.category,
          type: res.data.type,
          condition: res.data.condition,
        });
      })
      .catch(() => {
        toast.error("Failed to fetch product data.");
        setError("Failed to fetch product data.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("productName", form.productName);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("type", form.type);
      formData.append("condition", form.condition);

      if (imageFile) {
        formData.append("images", imageFile);
      }

      await axios.put(`http://localhost:3000/api/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully!");
      setTimeout(() => navigate("/my-product"), 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to update product. Please try again.");
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!product) return <div className="p-6 text-center">Loading product data...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8 mb-12">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price (Rs)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min={0}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kids</option>
              <option value="sale">Sale</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Type</option>
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
              <option value="donate">Donate</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Condition</label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Product Image (leave empty to keep current)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {product.image && !imageFile && (
              <img
                src={`http://localhost:3000/uploads/${product.image}`}
                alt={product.productName}
                className="mt-4 w-48 h-48 object-cover rounded border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 transition"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default EditProduct;
