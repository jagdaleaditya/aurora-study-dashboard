import { motion } from "framer-motion";
import { MotionNumber } from "./MotionNumber.jsx";
import { PremiumCard } from "./PremiumCard.jsx";

export function StatCard({ icon: Icon, label, value, suffix, trend, tone, delay }) {
  return (
    <PremiumCard delay={delay} className="min-h-[152px]">
      <div className="flex items-start justify-between gap-5">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-glow`}
        >
          <Icon size={22} />
        </motion.div>
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
          {trend}
        </span>
      </div>
      <div className="mt-7">
        <div className="text-3xl font-semibold tracking-normal text-slate-950 dark:text-white">
          <MotionNumber value={value} suffix={suffix} decimals={suffix === "h" ? 1 : 0} />
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </PremiumCard>
  );
}
