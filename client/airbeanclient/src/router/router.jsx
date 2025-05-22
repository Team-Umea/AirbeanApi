import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import About from "../pages/About";
import Profil from "../pages/Profil";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import AccessRedirect from "../components/protectedRoute/AccessRedirect";
import ProductPage from "../pages/ProductPage";
import AdminPage from "../pages/Admin";
import MangeProductsPage from "../pages/ManageProducts";
import ManageDiscountPage from "../pages/ManageDiscount";
import AdminLayout from "../layout/AdminLayout";
import AdminRedirect from "../components/protectedRoute/AdminRedirect";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "register",
        element: (
          <AccessRedirect>
            <Register />
          </AccessRedirect>
        ),
      },
      {
        path: "login",
        element: (
          <AccessRedirect>
            <Login />
          </AccessRedirect>
        ),
      },
      {
        path: "cart",
        element: (
          <AdminRedirect>
            <Cart />
          </AdminRedirect>
        ),
      },
      {
        path: "meny",
        element: <ProductPage />,
      },
      {
        path: "profil",
        element: (
          <ProtectedRoute>
            <Profil />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
          {
            path: "produkter",
            element: <MangeProductsPage />,
          },
          {
            path: "rabatter",
            element: <ManageDiscountPage />,
          },
          {
            index: true,
            element: <AdminPage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
