// App.jsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Landing from './pages/Public/landing';
import LoginPage from "./pages/Public/login";
import RegistrationPage from "./pages/Public/registration";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <RegistrationPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
