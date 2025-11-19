import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// GEMINI_API_KEY is injected during esbuild compile time
export const GEMINI_KEY: string =
  typeof GEMINI_API_KEY !== "undefined" ? GEMINI_API_KEY : "";

if (!GEMINI_KEY) {
  console.warn("⚠️ Missing GEMINI_API_KEY! Make sure it is set in Render environment.");
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
