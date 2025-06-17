import React, { useEffect, useState } from "react";
import { useLogin } from "../Public/query";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaInstagram,
  FaLock,
} from "react-icons/fa";
import Image1 from "../../assets/Signin/signin1.jpg";
import Image2 from "../../assets/Signin/signin2.jpg";
import Image3 from "../../assets/Signin/signin3.jpg";
import Navbar from "../../components/Navbar/navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const images = [Image1, Image2, Image3];

const LoginPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { mutate: loginUser, isLoading } = useLogin();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(formData, {
      onSuccess: (data) => {
        toast.success("Login successful!");
      },
      onError: (err) => {
        const msg =
          err?.response?.data?.message || " Login failed. Please try again.";
        toast.error(msg);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto mt-10 p-10 shadow-lg bg-white rounded-xl">
        {/* Image + Heading Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center p-4">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">NEW TREND</h2>
          <div className="relative w-full max-w-md h-96 overflow-hidden rounded-md shadow-md bg-gray-200">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  currentImage === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-1/2 px-6 py-8 border-black rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Social icons */}
          <div className="flex justify-center mt-6 space-x-6 text-2xl">
            <FaGoogle className="cursor-pointer hover:text-red-500" />
            <FaFacebookF className="cursor-pointer hover:text-blue-600" />
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
          </div>

          <p className="mt-6 text-center text-sm text-gray-700">
            Don&apos;t have an account?{" "}
            <a
              href="/sign-up"
              className="text-red-600 hover:underline font-semibold"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
