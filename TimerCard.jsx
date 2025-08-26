import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function TimerCard({ label, onDelete }) {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const { width, height } = useWindowSize();

  useEffect(() => {
    let id;
    if (isActive && time > 0) {
      id = setInterval(() => setTime((t) => t - 1), 1000);
    }
    if (time === 0 && isActive) {
      setIsActive(false);
      
      // Show confetti animation
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
      
      // Play completion sound
      playCompletionSound();
      
      // Show alert notification
      alert(`⏰ ${label} finished!`);
    }
    return () => clearInterval(id);
  }, [isActive, time, label]);

  // Function to play completion sound
  const playCompletionSound = () => {
    try {
      // Create audio context for better browser compatibility
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create a pleasant completion sound using Web Audio API
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create a pleasant bell-like sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    } catch (error) {
      console.log('Audio not supported or blocked by browser');
    }
  };

  const start = () => {
    const total = (Number(minutes) || 0) * 60 + (Number(seconds) || 0);
    if (total <= 0) return;
    setTime(total);
    setIsActive(true);
  };
  const pause = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setTime(0);
    setMinutes(0);
    setSeconds(0);
  };

  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-5 w-full sm:w-72 flex flex-col items-center"
      >
      <div className="flex justify-between items-center w-full mb-2">
        <h2 className="text-xl font-bold text-white">{label}</h2>
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-600 font-bold text-lg"
          aria-label="Delete timer"
        >
          ✕
        </button>
      </div>

      {/* Quick Preset Buttons */}
      <div className="flex gap-2 mb-3 flex-wrap justify-center">
        <button
          onClick={() => { setMinutes(1); setSeconds(0); }}
          disabled={isActive}
          className="px-2 py-1 text-xs bg-purple-500 hover:bg-purple-600 text-white rounded disabled:opacity-50"
        >
          1min
        </button>
        <button
          onClick={() => { setMinutes(5); setSeconds(0); }}
          disabled={isActive}
          className="px-2 py-1 text-xs bg-purple-500 hover:bg-purple-600 text-white rounded disabled:opacity-50"
        >
          5min
        </button>
        <button
          onClick={() => { setMinutes(10); setSeconds(0); }}
          disabled={isActive}
          className="px-2 py-1 text-xs bg-purple-500 hover:bg-purple-600 text-white rounded disabled:opacity-50"
        >
          10min
        </button>
        <button
          onClick={() => { setMinutes(25); setSeconds(0); }}
          disabled={isActive}
          className="px-2 py-1 text-xs bg-purple-500 hover:bg-purple-600 text-white rounded disabled:opacity-50"
        >
          25min
        </button>
      </div>

      <div className="flex gap-3 mb-3 items-center">
        <div className="flex flex-col items-center">
          <label className="text-xs text-white/70 mb-1">Minutes</label>
          <input
            type="number"
            min="0"
            max="999"
            value={minutes}
            onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-16 p-2 border rounded-lg text-center bg-white/10 text-white placeholder-white/70 border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isActive}
          />
        </div>
        <div className="text-white text-xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <label className="text-xs text-white/70 mb-1">Seconds</label>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
            className="w-16 p-2 border rounded-lg text-center bg-white/10 text-white placeholder-white/70 border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isActive}
          />
        </div>
      </div>

      <p className="text-4xl font-mono text-white mb-4">{mm}:{ss}</p>

      <div className="flex gap-2 flex-wrap justify-center">
        <button
          onClick={start}
          disabled={isActive}
          className="px-3 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={pause}
          disabled={!isActive}
          className="px-3 py-1 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 disabled:opacity-50"
        >
          Pause
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
        >
          Reset
        </button>
      </div>
      </motion.div>
    </>
  );
}
