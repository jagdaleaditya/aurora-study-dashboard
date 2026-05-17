import { motion } from "framer-motion";
import { BarChart3, BookOpen, BrainCircuit, CalendarClock, CheckSquare, LayoutDashboard, Moon, Sparkles, Sun } from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: CheckSquare, label: "Tasks" },
  { icon: BarChart3, label: "Analytics" },
  { icon: CalendarClock, label: "Focus" },
];

export function Sidebar({ theme, setTheme }) {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 left-4 right-4 z-30 flex items-center justify-between rounded-[28px] border border-white/15 bg-white/75 px-3 py-3 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl dark:bg-slate-950/55 lg:bottom-6 lg:left-6 lg:right-auto lg:top-6 lg:w-[92px] lg:flex-col lg:px-4 lg:py-5"
    >
      <div className="hidden size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-300 text-white shadow-glow lg:grid">
        <BrainCircuit size={24} />
      </div>
      <nav className="flex flex-1 items-center justify-around gap-2 lg:flex-none lg:flex-col">
        {nav.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18 + index * 0.08 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            title={item.label}
            className="grid size-11 place-items-center rounded-2xl text-slate-600 transition hover:bg-slate-900 hover:text-white dark:text-slate-300 dark:hover:bg-white dark:hover:text-slate-950"
          >
            <item.icon size={20} />
          </motion.button>
        ))}
      </nav>
      <motion.button
        whileHover={{ scale: 1.08, rotate: 5 }}
        whileTap={{ scale: 0.94 }}
        title={theme === "dark" ? "Light mode" : "Dark mode"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg transition dark:bg-white dark:text-slate-950"
      >
        {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
      </motion.button>
      <div className="hidden text-cyan-300 lg:block">
        <Sparkles size={20} />
      </div>
    </motion.aside>
  );
}
