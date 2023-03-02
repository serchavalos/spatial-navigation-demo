import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  NavEngine,
  NavNodesContext,
  getKeyEventHandler
} from "./lib/spatial-navigation";

import { Welcome } from "./pages/Welcome";
import { Surprise } from "./pages/Surprise";

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
    path: "/surprise",
    element: <Surprise />
  }
]);

export default function App({ navEngine }: AppProps) {
  const handleKeyEvent = getKeyEventHandler(navEngine);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvent);
    return () => document.removeEventListener("keydown", handleKeyEvent);
  }, []);

  useEffect(() => {
    const handlePostMessage = (event: MessageEvent) => {
      const { action } = event.data;
      handleKeyEvent({ code: action } as KeyboardEvent);
    };
    window.addEventListener("message", handlePostMessage, false);

    return () => window.removeEventListener("message", handlePostMessage);
  }, []);

  return (
    <NavNodesContext.Provider value={navEngine}>
      <RouterProvider router={router} />
    </NavNodesContext.Provider>
  );
}
