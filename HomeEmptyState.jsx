export default function HomeEmptyState({ onAddTimer, onCreateFirst }) {
  return (
    <div className="w-full max-w-3xl">
      {/* Centered big Add button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={onAddTimer}
          className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-xl"
        >
          + Add Timer
        </button>
      </div>

      {/* Empty state card */}
      <div className="mx-auto w-full max-w-xl text-center bg-white/10 backdrop-blur-md rounded-3xl px-8 py-10 shadow-2xl">
        <div className="text-7xl mb-4">⏰</div>
        <h2 className="text-3xl font-bold text-white mb-2">No Active Timers</h2>
        <p className="text-white/80 mb-8">
          Add your first timer to get started with focused work sessions
        </p>
        <button
          onClick={onCreateFirst}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-pink-500 hover:opacity-95 text-white font-semibold shadow-xl"
        >
          🚀 Create First Timer
        </button>
      </div>
    </div>
  );
}
