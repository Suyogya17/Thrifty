import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar/navbar";
import { useGetUserProfile, useUserUpdate } from "./query";

const Account = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data: user, isLoading, error } = useGetUserProfile();
  const {
    mutate: updateUser,
    isPending,
    error: updateError,
  } = useUserUpdate();

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    phoneNo: "",
    address: "",
  });

  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        phoneNo: user.phoneNo,
        address: user.address,
      });
      setPreviewImage(`http://localhost:3000/uploads/${user.image}`);
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = () => {
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    if (newImage) {
      formData.append("profilePicture", newImage); // match your multer field name
    }

    updateUser({ formData, customerId: user._id });
    toast.success("Account updated!");
    setEditMode(false);
  };

  const handleDelete = () => {
    toast.error("Account deleted (mock)");
    setConfirmDelete(false);
    localStorage.removeItem("userToken");
    navigate("/");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <div
        className={`min-h-screen py-12 px-6 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div
          className={`max-w-3xl mx-auto p-8 rounded-xl shadow-xl ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Account</h2>
            <button
              className={`px-4 py-2 rounded-lg ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
              }`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div>
              <img
                src={previewImage}
                alt="Profile"
                className="w-24 h-24 rounded-full border object-cover"
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`mt-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                />
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold">{user.fullname}</h3>
              <p className="text-gray-400">{user.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            {["fullname", "username", "email", "phoneNo", "address"].map(
              (field) => (
                <div key={field}>
                  <label
                    className={`block text-sm font-medium capitalize ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {field}
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg mt-1 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                          : "bg-white border-gray-300 text-black placeholder-gray-700"
                      }`}
                    />
                  ) : (
                    <p className={`mt-1 ${darkMode ? "text-white" : "text-black"}`}>
                      {user[field]}
                    </p>
                  )}
                </div>
              )
            )}
          </div>

          <div className="mt-8 flex gap-4">
            {!editMode ? (
              <button
                onClick={handleEdit}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit Account
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  disabled={isPending}
                >
                  {isPending ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            )}
            <button
              onClick={() => setConfirmDelete(true)}
              className="ml-auto px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete Account
            </button>
          </div>

          {updateError && (
            <p className="text-red-500 mt-2">{updateError.message}</p>
          )}

          {confirmDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl text-center w-80">
                <h3 className="text-lg font-bold mb-4">Are you sure?</h3>
                <p className="text-sm mb-6">
                  This will permanently delete your account.
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
