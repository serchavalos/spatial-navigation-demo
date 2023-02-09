import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NavNodesContext } from "./lib/spatial-navigation/nav-engine";

import { NavEngine } from "./lib/spatial-navigation";
import { Welcome } from "./pages/Welcome";
import { Category } from "./pages/Category";

import "./styles.css";

type AppProps = {
  navEngine: NavEngine;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/category",
    element: <Category />
  }
]);

export default function App({ navEngine }: AppProps) {
  return (
    <NavNodesContext.Provider value={navEngine}>
      <RouterProvider router={router} />
    </NavNodesContext.Provider>
  );
}
