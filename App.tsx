import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import { LGA } from './types';

// ---- Gemini API Setup ----
import { GoogleGenerativeAI } from "@google/genai";
import { GEMINI_KEY } from "./index";   // Exported from index.tsx

export const geminiClient = new GoogleGenerativeAI(GEMINI_KEY);
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
