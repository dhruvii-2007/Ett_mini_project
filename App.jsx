import { useState } from "react";
import Header from "./Header.jsx";
import HomeEmptyState from "./HomeEmptyState.jsx";
import Pomodoro from "./Pomodoro.jsx";
import MultiTimer from "./MultiTimer.jsx";

export default function App() {
  const [activeView, setActiveView] = useState("home"); // home | multi | pomodoro | analytics | presets

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <Header
          onPomodoro={() => setActiveView("pomodoro")}
          onPresets={() => setActiveView("presets")}
          onAnalytics={() => setActiveView("analytics")}
          onHome={() => setActiveView("home")}
          onVoice={() => alert("Voice coming soon 🎤")}
        />

        {/* Main */}
        <main className="min-h-[70vh] flex items-center justify-center py-10">
          {activeView === "home" && (
            <HomeEmptyState
              onAddTimer={() => setActiveView("multi")}
              onCreateFirst={() => setActiveView("multi")}
            />
          )}

          {activeView === "multi" && (
            <div className="w-full max-w-4xl mx-auto">
              <MultiTimer />
            </div>
          )}

          {activeView === "pomodoro" && (
            <div className="w-full max-w-md mx-auto">
              <Pomodoro />
            </div>
          )}

          {activeView === "presets" && (
            <div className="text-center text-white/90">
              <h2 className="text-3xl font-semibold mb-2">⚡ Presets</h2>
              <p className="text-white/70">
                We’ll wire this up in Phase 4.
              </p>
            </div>
          )}

          {activeView === "analytics" && (
            <div className="text-center text-white/90">
              <h2 className="text-3xl font-semibold mb-2">📊 Analytics</h2>
              <p className="text-white/70">
                Coming in a later phase (history, charts).
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
