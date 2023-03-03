import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { getKeyEventHandler } from "./lib/spatial-navigation";

import { Welcome } from "./pages/Welcome";
import { Surprise } from "./pages/Surprise";

import "./styles.css";
import { useEffect } from "react";

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
  const handleKeyEvent = getKeyEventHandler();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvent);
    return () => document.removeEventListener("keydown", handleKeyEvent);
  }, []);

  return <RouterProvider router={router} />;
}
