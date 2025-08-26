import { useState } from "react";
import TimerCard from "./TimerCard";

export default function MultiTimer() {
  const [timers, setTimers] = useState([
    { id: 1, label: "Timer 1" },
    { id: 2, label: "Timer 2" }
  ]);
  const [newTimerName, setNewTimerName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const addTimer = () => {
    if (newTimerName.trim()) {
      const newTimer = {
        id: Date.now(),
        label: newTimerName.trim()
      };
      setTimers([...timers, newTimer]);
      setNewTimerName("");
      setShowAddForm(false);
    }
  };

  const deleteTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  return (
    <div className="w-full">
      {/* Add Timer Section */}
      <div className="mb-8 flex flex-col items-center gap-4">
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-colors"
          >
            ➕ Add New Timer
          </button>
        ) : (
          <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 flex gap-3 items-center">
            <input
              type="text"
              value={newTimerName}
              onChange={(e) => setNewTimerName(e.target.value)}
              placeholder="Enter timer name..."
              className="px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyPress={(e) => e.key === 'Enter' && addTimer()}
              autoFocus
            />
            <button
              onClick={addTimer}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewTimerName("");
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Timers Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {timers.map((timer) => (
          <TimerCard
            key={timer.id}
            label={timer.label}
            onDelete={() => deleteTimer(timer.id)}
          />
        ))}
      </div>

      {timers.length === 0 && (
        <div className="text-center text-white/70 py-12">
          <div className="text-6xl mb-4">⏰</div>
          <h3 className="text-xl font-semibold mb-2">No Timers Yet</h3>
          <p>Add your first custom timer to get started!</p>
        </div>
      )}
    </div>
  );
}
