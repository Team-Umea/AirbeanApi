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
import Orderplaced from "../pages/Orderplaced";

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
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "cart",
        element: <Cart />,
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
        path: "orderplaced",
        element: (
          <ProtectedRoute>
            <Orderplaced />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
