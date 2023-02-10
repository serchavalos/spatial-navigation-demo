import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  NavEngine,
  NavNodesContext,
  getKeyEventHandler
} from "./lib/spatial-navigation";

import { Welcome } from "./pages/Welcome";
import { Category } from "./pages/Category";

import "./styles.css";
import { useEffect } from "react";

type AppProps = {
  navEngine: NavEngine;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/category/:categoryId",
    element: <Category />
  }
]);

export default function App({ navEngine }: AppProps) {
  useEffect(() => {
    const handleKeyEvent = getKeyEventHandler(navEngine);

    document.addEventListener("keydown", handleKeyEvent);
    return () => document.removeEventListener("keydown", handleKeyEvent);
  }, [navEngine]);

  return (
    <NavNodesContext.Provider value={navEngine}>
      <RouterProvider router={router} />
    </NavNodesContext.Provider>
  );
}
