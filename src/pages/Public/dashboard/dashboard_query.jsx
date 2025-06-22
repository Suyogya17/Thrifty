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