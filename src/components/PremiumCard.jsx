import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export function PremiumCard({ children, className = "", delay = 0 }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(132, 92, 255, 0.22), transparent 42%)`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-[28px] border border-white/14 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl transition-colors duration-500 dark:bg-white/[0.07] ${className}`}
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background }} />
      <div className="pointer-events-none absolute inset-px rounded-[27px] bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-70" />
      <div className="relative z-10">{children}</div>
    </motion.section>
  );
}
