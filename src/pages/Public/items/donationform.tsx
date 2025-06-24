import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/navbar";
import { useDonateClothes } from "../../../pages/Public/items/query";
import { toast } from "react-toastify";

const DonationForm = () => {
  const navigate = useNavigate();
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

    mutate(formData as any, {
      onSuccess: () => {
      toast.success("Donation submitted successfully!");
      navigate("/dashboard");
      },
      onError: (err) => {
      toast.error("Failed to submit donation. Please try again.");
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
            {/* Donor Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Donor Name</label>
              <input
                type="text"
                name="donorName"
                value={form.donorName}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-1">Pick-Up Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            {/* Sanitized */}
            <div>
              <label className="block text-sm font-medium mb-2">Is it Sanitized?</label>
              <div className="flex gap-4">
                {["Yes", "No"].map((val) => (
                  <label key={val} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sanitized"
                      value={val}
                      checked={form.sanitized === val}
                      onChange={handleChange}
                      required
                    />
                    {val}
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description of Clothes</label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-md"
              >
                Submit Donation
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DonationForm;
