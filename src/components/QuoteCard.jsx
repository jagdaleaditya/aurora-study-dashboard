import { AnimatePresence, motion } from "framer-motion";
import { Quote, RefreshCw } from "lucide-react";
import { useState } from "react";
import { quotes } from "../data/seed.js";
import { PremiumCard } from "./PremiumCard.jsx";

export function QuoteCard() {
  const [index, setIndex] = useState(0);

  return (
    <PremiumCard delay={0.42} className="xl:col-span-4">
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-rose-400 text-slate-950 shadow-glow">
          <Quote size={21} />
        </div>
        <button
          onClick={() => setIndex((current) => (current + 1) % quotes.length)}
          title="Refresh quote"
          className="grid size-11 place-items-center rounded-2xl border border-white/15 bg-white/20 text-slate-600 transition hover:bg-white/40 dark:text-slate-300"
        >
          <RefreshCw size={18} />
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={quotes[index]}
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(10px)" }}
          transition={{ duration: 0.45 }}
          className="mt-8 text-2xl font-semibold leading-tight text-slate-950 dark:text-white"
        >
          {quotes[index]}
        </motion.p>
      </AnimatePresence>
      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Today / precision over pressure</p>
    </PremiumCard>
  );
}
