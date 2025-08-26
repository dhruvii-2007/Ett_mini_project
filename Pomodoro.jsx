import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Pomodoro() {
  const [isActive, setIsActive] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [time, setTime] = useState(25 * 60);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [sessions, setSessions] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { width, height } = useWindowSize();

  const totalTime = isWork ? workDuration * 60 : breakDuration * 60;
  const percentage = ((totalTime - time) / totalTime) * 100;

  // Timer logic
  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0 && isActive) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);

      if (isWork) {
        setSessions((s) => s + 1);
        setIsWork(false);
        setTime(breakDuration * 60);
      } else {
        setIsWork(true);
        setTime(workDuration * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, time, isWork, workDuration, breakDuration]);

  // 👇 Reset the displayed time immediately when durations change (only if paused)
  useEffect(() => {
    if (!isActive && isWork) {
      setTime(workDuration * 60);
    }
  }, [workDuration, isActive, isWork]);

  useEffect(() => {
    if (!isActive && !isWork) {
      setTime(breakDuration * 60);
    }
  }, [breakDuration, isActive, isWork]);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setIsWork(true);
    setTime(workDuration * 60); // 👈 always respect latest work duration
    setSessions(0);
  };

  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"
      } min-h-screen flex flex-col items-center justify-center px-4`}
    >
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="w-full max-w-md p-6 rounded-3xl shadow-2xl bg-white/20 backdrop-blur-lg text-center">
        <h1
          className={`text-3xl font-bold mb-4 drop-shadow ${
            darkMode ? "text-yellow-300" : "text-white"
          }`}
        >
          Pomodoro Timer 🍅
        </h1>

        {/* Mode Label */}
        <p
          className={`text-xl mb-2 ${
            darkMode ? "text-yellow-200" : "text-white"
          }`}
        >
          {isWork ? "💼 Work Session" : "☕ Break Time"}
        </p>

        {/* Circular Progress Bar */}
        <div className="w-48 h-48 mx-auto mb-6">
          <CircularProgressbar
            value={percentage}
            text={`${mm}:${ss}`}
            styles={buildStyles({
              textColor: darkMode ? "#facc15" : "#fff",
              pathColor: isWork ? "#22c55e" : "#3b82f6",
              trailColor: darkMode ? "#374151" : "#d1d5db",
            })}
          />
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={start}
            disabled={isActive}
            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow disabled:opacity-50"
          >
            Start
          </button>
          <button
            onClick={pause}
            disabled={!isActive}
            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow disabled:opacity-50"
          >
            Pause
          </button>
          <button
            onClick={reset}
            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow"
          >
            Reset
          </button>
        </div>

        {/* Settings */}
        <div className="flex gap-3 justify-center mb-4">
          <div>
            <label className="block text-sm text-white">Work (min)</label>
            <input
              type="number"
              min="1"
              value={workDuration}
              onChange={(e) => setWorkDuration(Number(e.target.value))}
              className="w-20 p-2 rounded-lg border border-white/30 bg-white/10 text-white text-center"
              disabled={isActive} // 👈 prevent changing while running
            />
          </div>
          <div>
            <label className="block text-sm text-white">Break (min)</label>
            <input
              type="number"
              min="1"
              value={breakDuration}
              onChange={(e) => setBreakDuration(Number(e.target.value))}
              className="w-20 p-2 rounded-lg border border-white/30 bg-white/10 text-white text-center"
              disabled={isActive}
            />
          </div>
        </div>

        <p className="text-white text-lg mb-4">
          ✅ Sessions Completed: <span className="font-bold">{sessions}</span>
        </p>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-xl shadow"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}
