import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/Footer/footer";

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchDonations = async () => {
      if (!userId) {
        setError("User not logged in.");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/donation/user/${userId}`);
        setDonations(res.data);
      } catch (err) {
        setError("Failed to load donations");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [userId]);

  if (loading) return <p className="text-center mt-10">Loading donations...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">My Donations</h1>
        {donations.length === 0 ? (
          <p>No donations found.</p>
        ) : (
          donations.map((donation) => (
            <div key={donation._id} className="border rounded p-4 mb-6 shadow bg-white">
              <h2 className="text-xl font-semibold mb-2">{donation.donorName}</h2>
              <img
                src={`http://localhost:3000/uploads/${donation.image}`}
                alt="Donation"
                className="w-48 h-48 object-cover rounded mb-4"
              />
              <p><strong>Address:</strong> {donation.address}</p>
              <p><strong>Sanitized:</strong> {donation.sanitized}</p>
              <p><strong>Description:</strong> {donation.description}</p>
              <p><strong>Date:</strong> {new Date(donation.date).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyDonations;
