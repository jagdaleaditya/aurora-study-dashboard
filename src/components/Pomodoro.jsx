import { motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PremiumCard } from "./PremiumCard.jsx";

const FOCUS_SECONDS = 25 * 60;

export function Pomodoro() {
  const [seconds, setSeconds] = useState(FOCUS_SECONDS);
  const [running, setRunning] = useState(false);
  const progress = useMemo(() => 1 - seconds / FOCUS_SECONDS, [seconds]);
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainder = String(seconds % 60).padStart(2, "0");

  useEffect(() => {
    if (!running) return undefined;
    const interval = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          setRunning(false);
          return FOCUS_SECONDS;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  return (
    <PremiumCard delay={0.36} className="xl:col-span-4">
      <p className="text-sm font-medium uppercase text-fuchsia-500 dark:text-fuchsia-300">Pomodoro</p>
      <h2 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">Deep work</h2>
      <div className="mt-7 grid place-items-center">
        <div className="relative grid size-52 place-items-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="92" stroke="rgba(148,163,184,.18)" strokeWidth="14" fill="none" />
            <motion.circle
              cx="110"
              cy="110"
              r="92"
              stroke="url(#timerGradient)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="578"
              animate={{ strokeDashoffset: 578 - 578 * progress }}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="timerGradient" x1="0" x2="1">
                <stop stopColor="#a855f7" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div animate={{ scale: running ? [1, 1.025, 1] : 1 }} transition={{ duration: 1.4, repeat: running ? Infinity : 0 }}>
            <p className="text-center text-5xl font-semibold text-slate-950 dark:text-white">{minutes}:{remainder}</p>
            <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">{running ? "Flow active" : "Ready"}</p>
          </motion.div>
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-3">
        <button
          onClick={() => setRunning((current) => !current)}
          title={running ? "Pause timer" : "Start timer"}
          className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-white shadow-glow transition dark:bg-white dark:text-slate-950"
        >
          {running ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setSeconds(FOCUS_SECONDS);
          }}
          title="Reset timer"
          className="grid size-12 place-items-center rounded-2xl border border-white/15 bg-white/20 text-slate-600 transition hover:bg-white/40 dark:text-slate-300"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </PremiumCard>
  );
}
