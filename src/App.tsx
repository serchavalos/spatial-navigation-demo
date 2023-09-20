import { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { getKeyEventHandler, NavEngineContext } from "./lib/spatial-navigation";

import { Welcome } from "./pages/Welcome";
import { Surprise } from "./pages/Surprise";

import "./styles.css";
import { LevelUp } from "./pages/LevelUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/surprise",
    element: <Surprise />
  },
  {
    path: "/levelup",
    element: <LevelUp />
  }
]);

export default function App() {
  const navEngine = useContext(NavEngineContext);

  useEffect(() => {
    if (!navEngine) {
      return;
    }

    const handleKeyEvent = getKeyEventHandler(navEngine);
    document.addEventListener("keydown", handleKeyEvent);
    return () => document.removeEventListener("keydown", handleKeyEvent);
  }, [navEngine]);

  return <RouterProvider router={router} />;
}
