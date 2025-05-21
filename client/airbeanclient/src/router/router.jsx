import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Menu from "../pages/Menu";
import About from "../pages/About";
import Profil from "../pages/Profil";
import Orderstatus from "../pages/Orderstatus";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Menu />,
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
        element: <Cart />,
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
        path: "orderstatus",
        element: (
          <ProtectedRoute>
            <Orderstatus />
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
