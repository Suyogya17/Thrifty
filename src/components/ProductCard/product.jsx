import React from "react";

// Star Rating Renderer
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  const stars = [];

  for (let i = 0; i < full; i++) {
    stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
  }
  if (half) {
    stars.push(<span key="half" className="text-yellow-400">☆</span>);
  }
  for (let i = 0; i < empty; i++) {
    stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
  }

  return stars;
};

const ProductCard = ({
  image,
  name,
  rating,
  price,
  description,
  onRentClick,
  onBuyClick,
}) => {
  return (
    <div className="flex flex-col w-full max-w-sm h-[450px] bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
  <img
    src={image}
    alt={name}
    className="w-full h-80 object-fit bg-gray-100"
  />
  <div className="p-6 flex flex-col justify-between flex-grow">
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <div className="flex text-sm">{renderStars(rating)}</div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
    </div>

    <div className="flex justify-between items-center mt-4">
      <span className="text-xl font-bold text-purple-600 dark:text-purple-400">Rs {price}</span>
      <div className="flex space-x-3">
        <button
          onClick={onRentClick}
          className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition"
        >
          Rent
        </button>
        <button
          onClick={onBuyClick}
          className="bg-pink-500 text-white px-3 py-1 rounded-md hover:bg-pink-600 transition"
        >
          Buy
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default ProductCard;
