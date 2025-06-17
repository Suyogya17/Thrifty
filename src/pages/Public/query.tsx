import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["REGISTER_USER"],
    mutationFn: (data: {
      fullname: string;
      email: string;
      image: string;
      phoneNo: string;
      username: string;
      address: string;
      password: string;
    }) => axios.post("http://localhost:3000/api/auth/register", data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["LOGIN_USER"],
    mutationFn: (data: { email: string; password: string }) => {
      // Clear old token before making the request
      localStorage.removeItem("token");
      localStorage.removeItem("id");

      return axios
        .post("http://localhost:3000/api/auth/login", data)
        .then((response) => {
          // Save new token after successful login
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.cred._id); // Assuming 'cred._id' is the user ID
          return response;
        });
    },
  });
};

// ================================== Update user ================================

export const useUserUpdate = () => {
  return useMutation({
    mutationKey: ["UPDATE_USER"],
    mutationFn: (data: { formData: FormData; customerId: string }) => {
      const token = localStorage.getItem("token"); // Get token from storage
      return axios.put(
        `http://localhost:3000/api/auth/updateUser/${data.customerId}`,
        data.formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        }
      );
    },
  });
};

// ================================== Get user by id  ================================

export const useGetUserProfile = () => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["GET_USER_PROFILE"],
    queryFn: async () => {
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const response = await axios.get(
        `http://localhost:3000/api/auth/userfindbyid`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Token being passed to API:", token);

      return response.data;
    },
  });
};

// ================================== get all user ================================

export const useGetUser = () => {
  return useQuery({
    queryKey: ["GET_USER_LIST"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/api/auth/getAllUser"
      );
      return response.data;
    },
  });
};

//  ============================= forgot password =====================================

export const useRequestPasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const requestPasswordReset = async (email: string) => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await axios.post("/api/customer/requestPasswordReset", {
        email,
      });
      setMessage(response.data.message); // Success message
    } catch (err) {
      setError("An error occurred while sending the reset email.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    message,
    error,
    requestPasswordReset,
  };
};

// ================use reset password =====================

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage(null);

      // Send the reset password request to the backend
      const response = await axios.post(
        "http://localhost:3000/api/customer/requestPasswordReset",
        { email }
      );

      // Assuming the response contains a success message
      setMessage(response.data.message); // Set the success message from the response
    } catch (err: any) {
      setError("An error occurred while sending the reset email."); // Set the error message
    } finally {
      setIsLoading(false);
    }
  };

  return { forgotPassword, isLoading, error, message };
};
