// App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProductDetails from "./components/ProductCard/productdetail";
import WishlistPage from "./components/wishlist/myWishlist";
import Account from "./pages/Public/account";
import CategoryPage from "./pages/Public/category/category";
import Dashboard from './pages/Public/dashboard/dashboard';
import Landing from './pages/Public/dashboard/landing';
import AddProduct from "./pages/Public/items/add_products";
import Buy from "./pages/Public/items/buy";
import Donate from "./pages/Public/items/donate";
import Donation from "./pages/Public/items/donationform";
import MyDonation from "./pages/Public/items/mydonation";
import MyProduct from "./pages/Public/items/myproduct";
import EditProduct from "./pages/Public/items/product-edit";
import Rent from "./pages/Public/items/rent";
import RentForm from "./pages/Public/items/rentform";
import Sell from "./pages/Public/items/sell";
import LoginPage from "./pages/Public/login";
import Cart from "./pages/Public/orders/cart";
import Checkout from "./pages/Public/orders/checkoutform";
import Order from "./pages/Public/orders/order";
import PayNow from "./pages/Public/orders/paynow";
import RegistrationPage from "./pages/Public/registration";
import PayConfirmation from "./pages/Public/orders/payconfirmation";

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
    path: "/rent-form",
    element:<RentForm/>,
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
  path: "/pay-now/:orderId",
  element: <PayNow />,
},
{
  path: "/pay-confirmation/:orderId",
  element: <PayConfirmation />,
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
