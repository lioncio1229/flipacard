import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/iloveyou",
    element: <div>ILOVEYOUSOMUCH AKING MISIS</div>,
  },
]);

export default function Pages() {
  return <RouterProvider router={router} />;
}
