export const subjects = [
  { id: "design", name: "Design Systems", color: "#8b5cf6", goal: 12 },
  { id: "ai", name: "AI Research", color: "#06b6d4", goal: 10 },
  { id: "math", name: "Quant Math", color: "#22c55e", goal: 8 },
  { id: "writing", name: "Writing", color: "#f59e0b", goal: 7 },
];

export const initialTasks = [
  {
    id: "task-1",
    title: "Review transformer attention notes",
    subject: "AI Research",
    minutes: 70,
    priority: "High",
    done: false,
  },
  {
    id: "task-2",
    title: "Sketch dashboard component states",
    subject: "Design Systems",
    minutes: 45,
    priority: "Medium",
    done: true,
  },
  {
    id: "task-3",
    title: "Practice probability distributions",
    subject: "Quant Math",
    minutes: 60,
    priority: "High",
    done: false,
  },
  {
    id: "task-4",
    title: "Draft synthesis essay outline",
    subject: "Writing",
    minutes: 35,
    priority: "Low",
    done: false,
  },
];

export const weeklyAnalytics = [
  { day: "Mon", focus: 3.1, deep: 1.8, tasks: 5 },
  { day: "Tue", focus: 4.4, deep: 2.5, tasks: 7 },
  { day: "Wed", focus: 2.9, deep: 1.4, tasks: 4 },
  { day: "Thu", focus: 5.2, deep: 3.1, tasks: 8 },
  { day: "Fri", focus: 4.8, deep: 2.8, tasks: 6 },
  { day: "Sat", focus: 6.1, deep: 3.7, tasks: 9 },
  { day: "Sun", focus: 3.7, deep: 2.1, tasks: 5 },
];

export const quotes = [
  "Make the next hour so clean that tomorrow feels lighter.",
  "Focus is a design decision: remove what does not deserve you.",
  "Tiny repetitions compound into a different future.",
  "The work becomes elegant when attention becomes honest.",
];
