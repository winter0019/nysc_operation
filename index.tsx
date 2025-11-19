import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// GEMINI_API_KEY is replaced at build time by esbuild.
// Example after build: const GEMINI_KEY = "AIza...yourKey...";
export const GEMINI_KEY: string = typeof GEMINI_API_KEY !== "undefined"
  ? GEMINI_API_KEY
  : "";

if (!GEMINI_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is missing! Make sure it is set in Render environment variables and that your ESBuild --define is correct.");
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
