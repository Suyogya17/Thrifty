import { useEffect, useState } from "react";
import { useDeleteItem, useGetItems } from "../items/query";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/Footer/footer";

const MyProducts = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const { data: items, isLoading, isError, error } = useGetItems();
  const { mutate: deleteItem } = useDeleteItem();
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    if (items && userId) {
      const myItems = items.filter((item) => item.owner === userId);
      const grouped = myItems.reduce((acc, item) => {
        const key = item.type || "Other";
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});
      setGroupedProducts(grouped);
    }
  }, [items, userId]);

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteItem(itemId, {
        onSuccess: () => {
          setGroupedProducts((prev) => {
            const updated = { ...prev };
            for (const type in updated) {
              updated[type] = updated[type].filter((item) => item._id !== itemId);
            }
            return updated;
          });
        },
      });
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading your products...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">My Listed Products</h1>

        {Object.keys(groupedProducts).length === 0 ? (
          <p className="text-gray-500">You haven’t uploaded any products yet.</p>
        ) : (
          Object.entries(groupedProducts).map(([type, products]) => (
            <div key={type} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 capitalize">{type} Products</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-4 py-3">Image</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Price (Rs)</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">
                          <img
                            src={`http://localhost:3000/uploads/${product.image}`}
                            alt={product.productName}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="px-4 py-2 font-medium">{product.productName}</td>
                        <td className="px-4 py-2">{product.price}</td>
                        <td className="px-4 py-2 text-sm">{product.description}</td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => navigate(`/edit/${product._id}`)}
                            className="text-blue-600 hover:underline mr-3"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:underline"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyProducts;
