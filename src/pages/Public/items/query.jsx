import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// ✅ Fetch all items
export const useGetItems = () => {
  return useQuery({
    queryKey: ["GET_ITEMS"],
    queryFn: async () => {
      const response = await api.get("/product/getAllProduct");
      return response.data;
    },
  });
};

// ✅ Fetch items by type
export const useGetItemsByType = (type) => {
  return useQuery({
    queryKey: ["itemsByType", type],
    queryFn: async () => {
      const response = await api.get(`/product/type/${type}`);
      return response.data;
    },
  });
};

// ✅ Add item with multipart/form-data
export const useAddItem = () =>
  useMutation({
    mutationFn: async (formData) => {
      const response = await api.post("/product/createProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });

// ✅ Delete an item
export const useDeleteItem = () => {
  return useMutation({
    mutationFn: async (itemId) => {
      const response = await api.delete(`/product/${itemId}`);
      return response.data;
    },
  });
};

// ✅ Update an item
export const useUpdateItem = () => {
  return useMutation({
    mutationFn: async ({ itemId, formData }) => {
      const response = await api.put(`/product/${itemId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

// ✅ Add donation mutation
export const useDonateClothes = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await api.post("/donate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};
