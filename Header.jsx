export default function Header({ onPomodoro, onPresets, onAnalytics, onHome, onVoice }) {
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-white">⏰ Advanced Timer</h1>
      </div>
      
      <nav className="flex items-center gap-4">
        <button
          onClick={onHome}
          className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          Home
        </button>
        <button
          onClick={onPomodoro}
          className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          🍅 Pomodoro
        </button>
        <button
          onClick={onPresets}
          className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          ⚡ Presets
        </button>
        <button
          onClick={onAnalytics}
          className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          📊 Analytics
        </button>
        <button
          onClick={onVoice}
          className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          🎤 Voice
        </button>
      </nav>
    </header>
  );
}
