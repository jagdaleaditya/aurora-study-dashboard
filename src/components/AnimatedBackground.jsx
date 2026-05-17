import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function AnimatedBackground() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 28 });
  const springY = useSpring(y, { stiffness: 90, damping: 28 });
  // Spring smoothing keeps the cursor-following glow premium instead of twitchy.
  const glow = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(99, 102, 241, 0.26), transparent 48%)`;

  useEffect(() => {
    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50 transition-colors duration-700 dark:bg-[#070816]">
      <motion.div className="absolute inset-0 opacity-80 dark:opacity-100" style={{ background: glow }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.055)_1px,transparent_1px)] bg-[size:70px_70px] dark:bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)]" />
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "linear-gradient(115deg, rgba(79,70,229,.32), transparent 23%, rgba(14,165,233,.20) 44%, transparent 64%, rgba(236,72,153,.20)), linear-gradient(20deg, transparent, rgba(34,197,94,.12), transparent)",
          backgroundSize: "220% 220%",
        }}
      />
      <motion.div
        animate={{ y: [-30, 30, -30], rotate: [0, 1.5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-10 top-0 h-[120vh] w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent blur-3xl"
      />
    </div>
  );
}
