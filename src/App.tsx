import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NavEngine, NavNodesContext } from "./lib/spatial-navigation";

import { Welcome } from "./pages/Welcome";
import { Surprise } from "./pages/Surprise";

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
    path: "/surprise",
    element: <Surprise />
  }
]);

export default function App({ navEngine }: AppProps) {
  return (
    <NavNodesContext.Provider value={navEngine}>
      <RouterProvider router={router} />
    </NavNodesContext.Provider>
  );
}
