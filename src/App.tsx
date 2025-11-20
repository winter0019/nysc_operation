// App.tsx
import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import { LGA } from "./types";
import { generateQueryDraft } from "./services/geminiService";

const App: React.FC = () => {
  const [loggedInLGA, setLoggedInLGA] = useState<LGA | null>(null);

  const handleLogin = (lga: LGA) => {
    setLoggedInLGA(lga);
  };

  const handleLogout = () => {
    setLoggedInLGA(null);
  };

  const handleGenerateQuery = async () => {
    if (!loggedInLGA) return;

    const draft = await generateQueryDraft(
      "late report submission",
      "John Doe",
      "KA",
      "Daura",
      loggedInLGA.name,
      "Mr. Inspector"
    );

    console.log("Generated Query Draft:", draft);
    alert(draft); // For testing in browser
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {!loggedInLGA ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <Dashboard
          lga={loggedInLGA}
          onLogout={handleLogout}
          onGenerateQuery={handleGenerateQuery} // optional button
        />
      )}
    </div>
  );
};

export default App;
