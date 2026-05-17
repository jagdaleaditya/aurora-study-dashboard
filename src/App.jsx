import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { BookOpen, Flame, Target, TimerReset } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedBackground } from "./components/AnimatedBackground.jsx";
import { AnalyticsChart } from "./components/AnalyticsChart.jsx";
import { Pomodoro } from "./components/Pomodoro.jsx";
import { ProgressTracker } from "./components/ProgressTracker.jsx";
import { QuoteCard } from "./components/QuoteCard.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { SkeletonLoader } from "./components/SkeletonLoader.jsx";
import { StatCard } from "./components/StatCard.jsx";
import { TaskPanel } from "./components/TaskPanel.jsx";
import { initialTasks } from "./data/seed.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { useTheme } from "./hooks/useTheme.js";

export default function App() {
  const { theme, setTheme } = useTheme();
  const [tasks, setTasks] = useLocalStorage("aurora-study-tasks", initialTasks);
  const [loading, setLoading] = useState(true);
  const headlineRef = useRef(null);
  const completed = tasks.filter((task) => task.done);
  const stats = useMemo(() => {
    const totalMinutes = completed.reduce((sum, task) => sum + task.minutes, 0);
    const completion = tasks.length ? Math.round((completed.length / tasks.length) * 100) : 0;
    return [
      { icon: BookOpen, label: "Focus hours", value: totalMinutes / 60, suffix: "h", trend: "+18%", tone: "from-violet-500 to-blue-500" },
      { icon: Target, label: "Completion", value: completion, suffix: "%", trend: "Live", tone: "from-cyan-400 to-emerald-400" },
      { icon: Flame, label: "Study streak", value: 12, suffix: "d", trend: "+3d", tone: "from-amber-300 to-rose-500" },
      { icon: TimerReset, label: "Deep sessions", value: 27, suffix: "", trend: "Elite", tone: "from-fuchsia-500 to-violet-500" },
    ];
  }, [completed, tasks]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!headlineRef.current || loading) return;
    const ctx = gsap.context(() => {
      // GSAP owns the hero reveal so the first impression feels more cinematic than a standard mount fade.
      gsap.fromTo(
        ".hero-line",
        { y: 64, opacity: 0, filter: "blur(18px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12, ease: "power4.out" }
      );
      gsap.fromTo(
        ".hero-glint",
        { xPercent: -120, opacity: 0 },
        { xPercent: 130, opacity: 1, duration: 1.4, delay: 0.35, ease: "power3.inOut" }
      );
    }, headlineRef);
    return () => ctx.revert();
  }, [loading]);

  return (
    <>
      <AnimatedBackground />
      <AnimatePresence>{loading && <SkeletonLoader />}</AnimatePresence>
      <Sidebar theme={theme} setTheme={setTheme} />
      <main className="min-h-screen px-4 pb-28 pt-5 text-slate-900 transition-colors duration-700 dark:text-white sm:px-6 lg:pb-10 lg:pl-32 lg:pr-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-[1520px]"
        >
          <header ref={headlineRef} className="relative overflow-hidden rounded-[36px] border border-white/15 bg-white/55 px-5 py-7 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl dark:bg-slate-950/45 sm:px-8 lg:px-10">
            <div className="hero-glint pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent blur-xl" />
            <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-4xl">
                <motion.p
                  className="hero-line inline-flex rounded-full border border-white/15 bg-white/25 px-4 py-2 text-sm font-medium text-violet-600 shadow-lg backdrop-blur-xl dark:text-violet-200"
                  whileHover={{ scale: 1.03 }}
                >
                  Aurora Study OS / premium focus cockpit
                </motion.p>
                <h1 className="mt-5 overflow-hidden text-5xl font-semibold leading-[0.96] tracking-normal text-slate-950 dark:text-white sm:text-7xl xl:text-8xl">
                  <span className="hero-line block">Design your</span>
                  <span className="hero-line block bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
                    deepest study flow.
                  </span>
                </h1>
              </div>
              <div className="hero-line grid gap-3 sm:grid-cols-3 xl:w-[470px]">
                {["Adaptive queue", "Live analytics", "Focus timer"].map((item) => (
                  <div key={item} className="rounded-3xl border border-white/15 bg-white/25 p-4 text-sm font-medium text-slate-700 backdrop-blur-xl dark:text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </header>

          <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} delay={0.08 + index * 0.06} />
            ))}
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-12">
            <TaskPanel tasks={tasks} setTasks={setTasks} />
            <ProgressTracker tasks={tasks} />
            <AnalyticsChart />
            <div className="grid gap-5 xl:col-span-4">
              <Pomodoro />
              <QuoteCard />
            </div>
          </section>
        </motion.div>
      </main>
    </>
  );
}
