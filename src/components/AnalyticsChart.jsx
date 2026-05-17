import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { weeklyAnalytics } from "../data/seed.js";
import { PremiumCard } from "./PremiumCard.jsx";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/15 bg-slate-950/85 p-3 text-sm text-white shadow-glow backdrop-blur-xl">
      <p className="font-medium">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} style={{ color: item.color }}>
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
}

export function AnalyticsChart() {
  return (
    <PremiumCard delay={0.3} className="xl:col-span-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase text-blue-500 dark:text-blue-300">Daily Analytics</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">Focus rhythm</h2>
        </div>
        <div className="flex rounded-2xl border border-white/15 bg-white/20 p-1 text-xs font-medium dark:bg-slate-950/30">
          <span className="rounded-xl bg-slate-950 px-3 py-2 text-white dark:bg-white dark:text-slate-950">Hours</span>
          <span className="px-3 py-2 text-slate-500 dark:text-slate-400">Tasks</span>
        </div>
      </div>
      <div className="mt-7 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyAnalytics} margin={{ top: 15, right: 12, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, .18)" />
            <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="focus" name="Focus h" stroke="#8b5cf6" strokeWidth={3} fill="url(#focusGradient)" animationDuration={1400} />
            <Area type="monotone" dataKey="deep" name="Deep h" stroke="#06b6d4" strokeWidth={3} fill="transparent" animationDuration={1600} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 h-[92px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyAnalytics} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
            <XAxis dataKey="day" hide />
            <YAxis hide />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="tasks" name="Tasks" radius={[12, 12, 12, 12]} fill="#22d3ee" animationDuration={1300} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </PremiumCard>
  );
}
