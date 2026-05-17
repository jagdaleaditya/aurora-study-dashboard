import { motion } from "framer-motion";
import { subjects } from "../data/seed.js";
import { PremiumCard } from "./PremiumCard.jsx";

export function ProgressTracker({ tasks }) {
  return (
    <PremiumCard delay={0.24} className="xl:col-span-5">
      <p className="text-sm font-medium uppercase text-cyan-500 dark:text-cyan-300">Subject Progress</p>
      <h2 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">Weekly momentum</h2>
      <div className="mt-7 space-y-6">
        {subjects.map((subject, index) => {
          const completedMinutes = tasks
            .filter((task) => task.subject === subject.name && task.done)
            .reduce((sum, task) => sum + task.minutes, 0);
          const progress = Math.min(100, Math.round((completedMinutes / (subject.goal * 60)) * 100));

          return (
            <div key={subject.id}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700 dark:text-slate-200">{subject.name}</span>
                <span className="text-slate-500 dark:text-slate-400">{progress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-950/10 dark:bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.2, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${subject.color}, rgba(255,255,255,.7))`,
                    boxShadow: `0 0 28px ${subject.color}66`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </PremiumCard>
  );
}
