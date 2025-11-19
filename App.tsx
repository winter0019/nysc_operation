import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import { LGA } from "./types";

// ---- Gemini API Setup ----
import { GoogleGenAI } from "@google/genai";

// GEMINI_API_KEY is injected by esbuild as a global constant.
// It will be replaced at build time.
const GEMINI_KEY: string =
  typeof GEMINI_API_KEY !== "undefined" ? GEMINI_API_KEY : "";

if (!GEMINI_KEY) {
  console.warn(
    "⚠️ GEMINI_API_KEY is missing! Make sure it is set in Render environment variables."
  );
}

export const geminiClient = new GoogleGenAI({
  apiKey: GEMINI_KEY,
});
// ---------------------------

const App: React.FC = () => {
  const [loggedInLGA, setLoggedInLGA] = useState<LGA | null>(null);

  const handleLogin = (lga: LGA) => {
    setLoggedInLGA(lga);
  };

  const handleLogout = () => {
    setLoggedInLGA(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {!loggedInLGA ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <Dashboard lga={loggedInLGA} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
