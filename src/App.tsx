import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { getKeyEventHandler, NavNodesContext } from "./lib/spatial-navigation";

import { Welcome } from "./pages/Welcome";
import { Surprise } from "./pages/Surprise";

import "./styles.css";
import { useContext, useEffect } from "react";

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
  const navEngine = useContext(NavNodesContext);

  useEffect(() => {
    if (!navEngine) {
      return;
    }

    const handleKeyEvent = getKeyEventHandler(navEngine);
    document.addEventListener("keydown", handleKeyEvent);
    return () => document.removeEventListener("keydown", handleKeyEvent);
  }, []);

  return <RouterProvider router={router} />;
}
