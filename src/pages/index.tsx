import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default function Pages() {
  return <RouterProvider router={router} />;
}
