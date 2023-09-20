import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { NavEngine, SpatialNavigationProvider } from "./lib/spatial-navigation";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("missing #root element");
}
const root = createRoot(rootElement);
const navEngine = new NavEngine();
// eslint-disable-next-line
// @ts-ignore
window.navEngine = navEngine;

root.render(
  <StrictMode>
    <SpatialNavigationProvider navEngine={navEngine}>
      <App />
    </SpatialNavigationProvider>
  </StrictMode>
);
