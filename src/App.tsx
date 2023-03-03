import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Welcome } from "./pages/Welcome";
import { Surprise } from "./pages/Surprise";

import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/surprise",
    element: <Surprise />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
