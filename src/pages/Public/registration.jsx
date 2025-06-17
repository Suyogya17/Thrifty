import { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLocationArrow,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import RegistrationImage from "../../assets/Signin/register.jpg";
import Navbar from "../../components/Navbar/navbar";
import { useRegister } from "../Public/query";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    username: "",
    address: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: registerUser, isLoading } = useRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const userData = {
      fullname: formData.fullName,
      email: formData.email,
      image: "", // You can later add image upload
      phoneNo: formData.phone,
      username: formData.username,
      address: formData.address,
      password: formData.password,
    };

    registerUser(userData, {
      onSuccess: () => {
        setSuccessMessage("Registration successful! Redirecting to sign-in...");
      },
      onError: (err) => {
        const msg =
          err?.response?.data?.message || "Registration failed. Please try again.";
        setErrorMessage(msg);
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-8">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row">
          {/* Left Image */}
          <div className="lg:w-1/2 hidden lg:block">
            <img
              src={RegistrationImage}
              alt="Registration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="lg:w-1/2 p-8 sm:p-12 border border-black rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
              Create Account
            </h2>

            {/* Success / Error message */}
            {successMessage && (
              <p className="text-green-600 text-center mb-4 font-medium">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-red-600 text-center mb-4 font-medium">
                {errorMessage}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <InputField
                id="fullName"
                name="fullName"
                icon={<FaUser />}
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />

              {/* Email */}
              <InputField
                id="email"
                name="email"
                type="email"
                icon={<FaEnvelope />}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              {/* Username */}
              <InputField
                id="username"
                name="username"
                icon={<FaUser />}
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
              />

              {/* Address */}
              <InputField
                id="address"
                name="address"
                icon={<FaLocationArrow />}
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
              />

              {/* Phone */}
              <InputField
                id="phone"
                name="phone"
                type="tel"
                icon={<FaPhone />}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />

              {/* Password */}
              <PasswordField
                id="password"
                name="password"
                show={showPassword}
                setShow={setShowPassword}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />

              {/* Confirm Password */}
              <PasswordField
                id="confirmPassword"
                name="confirmPassword"
                show={showConfirmPassword}
                setShow={setShowConfirmPassword}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition font-semibold"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-700">
              Already have an account?{" "}
              <a href="/sign-in" className="text-red-600 font-semibold hover:underline">
                SIGN-IN
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;

const InputField = ({ id, name, icon, placeholder, value, onChange, type = "text" }) => (
  <div>
    <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
      {id.charAt(0).toUpperCase() + id.slice(1)}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  </div>
);

const PasswordField = ({ id, name, show, setShow, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
      {id === "confirmPassword" ? "Confirm Password" : "Password"}
    </label>
    <div className="relative">
      <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type={show ? "text" : "password"}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </div>
);
