import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";

// A refresh always starts on the first frame (the hero):
// - stop the browser restoring the old scroll position
// - drop the "#section" that nav clicks leave in the URL, so it doesn't jump there
// A fresh visit to a shared "#section" link still scrolls to that section.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const navEntry = performance.getEntriesByType?.("navigation")[0] as PerformanceNavigationTiming | undefined;
if (navEntry?.type === "reload" && location.hash) history.replaceState(null, "", location.pathname + location.search);
if (!location.hash) window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
