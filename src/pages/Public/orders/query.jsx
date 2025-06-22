import axios from "axios";

const BASE_URL = "http://localhost:3000/api/order";

// ✅ 1. Create Order
export const createOrder = async (orderData) => {
  const response = await axios.post(`${BASE_URL}/create`, orderData);
  return response.data;
};

// ✅ 2. Get All Orders
export const getAllOrders = async () => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
};

// ✅ 3. Get Order by ID
export const getOrderById = async (orderId) => {
  const response = await axios.get(`${BASE_URL}/${orderId}`);
  return response.data;
};

// ✅ 4. Get Orders by Customer ID
export const getOrdersByCustomer = async (userId) => {
  const response = await axios.get(`${BASE_URL}/customer/${userId}`);
  return response.data;
};

// ✅ 5. Update Order by ID
export const updateOrder = async (orderId, updateData) => {
  const response = await axios.put(`${BASE_URL}/${orderId}`, updateData);
  return response.data;
};

// ✅ 6. Delete Order by ID
export const deleteOrder = async (orderId) => {
  const response = await axios.delete(`${BASE_URL}/${orderId}`);
  return response.data;
};
