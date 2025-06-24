import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar/navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "men",
    condition: "New",
    price: "",
    type: "rent",
    owner: "",
  });

  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    console.log("Retrieved user ID from localStorage in AddItemForm:", storedId);
    if (storedId) {
      setUserId(storedId);
      setFormData((prev) => ({ ...prev, owner: storedId }));
    } else {
      toast.error("You must be logged in to upload an item.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.owner) {
      toast.error("Owner ID is missing. Please log in first.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      const res = await axios.post("http://localhost:3000/api/product/createProduct", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Item uploaded successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      toast.error("Failed to upload item.");
    }
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 space-y-4 border rounded shadow bg-white mt-10"
      >
        <h2 className="text-xl font-bold">Upload New Item</h2>

        <p className="text-sm text-gray-600">
          <strong>Logged in as:</strong>{" "}
          <span className="text-purple-600">{userId || "Not Found"}</span>
        </p>

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kids</option>
          <option value="sale">Sale</option>
        </select>

        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="rent">Rent</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
          <option value="donate">Donate</option>
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Submit Item
        </button>
      </form>
    </>
  );
};

export default AddItemForm;
