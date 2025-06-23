import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/navbar";

// Local image imports
import donate1 from "../../../assets/donate/donate1.jpg";
import donate2 from "../../../assets/donate/donate2.jpg";
import donate3 from "../../../assets/donate/donate3.jpg";
import bannerImage from "../../../assets/donate/banner.png";

const Donate = () => {
  const navigate = useNavigate();

  const donations = [
    {
      id: 1,
      image: donate1,
      text: "We collect the clothes from the customer willing to donate their clothes at their location or they can directly deliver to us.",
    },
    {
      id: 2,
      image: donate2,
      text: "The collected clothes are then checked properly and are sanitized. Then it is packed in the boxes that are ready to be donated.",
    },
    {
      id: 3,
      image: donate3,
      text: "Finally the clothes are kept in the donation area where needed person can take the clothes and wear them.",
    },
  ];

  const handleDonateClick = () => {
    navigate("/donation-form");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-700 mb-16">
          How Does It Work?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {donations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:scale-105"
            >
              <img
                src={item.image}
                alt="Donate Step"
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <p className="text-gray-700 text-base leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-6">
            Are you ready to donate your unused clothes?
          </h2>

          <button
            onClick={handleDonateClick}
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            Donate Now
          </button>
        </div>

        {/* ✅ Banner Section */}
        <div className="mt-16 relative max-w-7xl mx-auto rounded-xl overflow-hidden shadow-xl">
          <img
            src={bannerImage}
            alt="Donation Banner"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h3 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
              Your small act of kindness can bring a big change. 💜
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donate;
