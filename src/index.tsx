import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { NavEngine } from "./lib/spatial-navigation";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("missing #root element");
}
const root = createRoot(rootElement);
const navEngine = new NavEngine();

root.render(
  <StrictMode>
    <App navEngine={navEngine} />
  </StrictMode>
);
