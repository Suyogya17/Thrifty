// App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from './pages/Public/dashboard/dashboard';
import Account from "./pages/Public/account";
import AddProduct from "./pages/Public/items/add_products";
import MyProduct from "./pages/Public/items/myproduct";
import MyDonation from "./pages/Public/items/mydonation";
import ProductDetails from "./components/ProductCard/productdetail";
import Landing from './pages/Public/dashboard/landing';
import Rent from "./pages/Public/items/rent";
import Buy from "./pages/Public/items/buy";
import Sell from "./pages/Public/items/sell";
import Order from "./pages/Public/orders/order";
import Donate from "./pages/Public/items/donate";
import Donation from "./pages/Public/items/donationform";
import Cart from "./pages/Public/orders/cart";
import Checkout from "./pages/Public/orders/checkoutform";
import LoginPage from "./pages/Public/login";
import RegistrationPage from "./pages/Public/registration";
import EditProduct from "./pages/Public/items/product-edit";
import CategoryPage from "./pages/Public/category/category";
import WishlistPage from "./components/wishlist/myWishlist";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element:<Dashboard/>,
  },
  {
  path: "/product/:id",
  element: <ProductDetails />,
},
  {
    path: "/rent",
    element:<Rent/>,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/add-product",
    element: <AddProduct />,
  },
  {
    path: "/edit/:id",
    element: <EditProduct />,
  },
  {
    path: "/my-product",
    element: <MyProduct />,
  },
  {
    path: "/my-donation",
    element: <MyDonation />,
  },
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "/buy",
    element: <Buy />,
  },
  {
    path: "/sell",
    element: <Sell />,
  },

   {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/donate",
    element: <Donate />,
  },
  {
    path: "/donation-form",
    element: <Donation />,
  },
   {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/sign-up",
    element: <RegistrationPage />,
  },

  {
    path: "/wishlist",
    element: <WishlistPage />,
  },

  {
    path: "/category/:categoryName",
    element: <CategoryPage />,
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
