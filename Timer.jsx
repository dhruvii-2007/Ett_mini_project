import { useEffect, useState } from "react";

export default function Timer({ label = "Timer" }) {
  const [time, setTime] = useState(60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let id;
    if (isActive && time > 0) id = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [isActive, time]);

  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  return (
    <div className="rounded-2xl bg-white/15 backdrop-blur-md p-5 shadow-xl text-center">
      <div className="text-white/90 font-semibold mb-2">{label}</div>
      <div className="text-4xl font-mono font-bold text-white mb-4">{mm}:{ss}</div>
      <div className="flex justify-center gap-2">
        <button onClick={() => setIsActive(true)} className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white">Start</button>
        <button onClick={() => setIsActive(false)} className="px-3 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white">Pause</button>
        <button onClick={() => { setIsActive(false); setTime(60); }} className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white">Reset</button>
      </div>
    </div>
  );
}
