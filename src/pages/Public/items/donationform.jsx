import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDonateClothes } from "./query";
import { toast } from "react-toastify";
import Navbar from "../../../components/Navbar/navbar";

const DonationForm = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const [form, setForm] = useState({
    donorName: "",
    address: "",
    sanitized: "",
    description: "",
    date: "",
  });
  const [image, setImage] = useState(null);

  const { mutate } = useDonateClothes();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (image) formData.append("image", image);
    if (userId) formData.append("userId", userId);

    mutate(formData, {
      onSuccess: () => {
        toast.success("Donation submitted successfully!");
        navigate("/dashboard");
      },
      onError: (err) => {
        toast.error("Failed to submit donation.");
        console.error("Donation failed:", err);
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
            Clothes Donation Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="donorName" value={form.donorName} onChange={handleChange} placeholder="Donor Name" required className="w-full border px-4 py-2 rounded-lg" />
            <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Address" required className="w-full border px-4 py-2 rounded-lg" />
            <div className="flex gap-4">
              {["Yes", "No"].map((val) => (
                <label key={val} className="flex gap-2 items-center">
                  <input type="radio" name="sanitized" value={val} checked={form.sanitized === val} onChange={handleChange} required />
                  {val}
                </label>
              ))}
            </div>
            <textarea name="description" rows={3} value={form.description} onChange={handleChange} placeholder="Clothes Description" required className="w-full border px-4 py-2 rounded-lg" />
            <input type="file" accept="image/*" onChange={handleImageChange} required className="w-full" />
            <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full border px-4 py-2 rounded-lg" />
            <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg">Submit Donation</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DonationForm;
