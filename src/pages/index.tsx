import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import Gameplay from "./gameplay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/gameplay",
    element: <Gameplay />,
  },
]);

export default function Pages() {
  return <RouterProvider router={router} />;
}
