import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Read the injected API key safely — ESBuild replaces this string at build-time.
// If the key is missing, fallback to an empty string to avoid runtime crashes.
export const GEMINI_KEY: string = (process.env.GEMINI_API_KEY as string) || "";

if (!GEMINI_KEY) {
  console.warn("⚠️ GEMINI API KEY is missing! Make sure it is set in Render environment variables.");
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
