import { AnimatePresence, motion } from "framer-motion";
import { Check, Edit3, Plus, Save, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { subjects } from "../data/seed.js";
import { PremiumCard } from "./PremiumCard.jsx";

const emptyTask = { title: "", subject: subjects[0].name, minutes: 30, priority: "Medium" };

export function TaskPanel({ tasks, setTasks }) {
  const [draft, setDraft] = useState(emptyTask);
  const [editingId, setEditingId] = useState(null);
  const completeCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);

  function submitTask(event) {
    event.preventDefault();
    if (!draft.title.trim()) return;

    if (editingId) {
      setTasks((current) =>
        current.map((task) => (task.id === editingId ? { ...task, ...draft, minutes: Number(draft.minutes) } : task))
      );
      setEditingId(null);
    } else {
      setTasks((current) => [
        { id: crypto.randomUUID(), ...draft, minutes: Number(draft.minutes), done: false },
        ...current,
      ]);
    }
    setDraft(emptyTask);
  }

  function beginEdit(task) {
    setEditingId(task.id);
    setDraft({
      title: task.title,
      subject: task.subject,
      minutes: task.minutes,
      priority: task.priority,
    });
  }

  return (
    <PremiumCard delay={0.18} className="xl:col-span-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase text-violet-500 dark:text-violet-300">Study Queue</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">{completeCount}/{tasks.length} completed</h2>
        </div>
        <div className="h-2 w-44 overflow-hidden rounded-full bg-slate-950/10 dark:bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${tasks.length ? (completeCount / tasks.length) * 100 : 0}%` }}
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-300"
          />
        </div>
      </div>

      <form onSubmit={submitTask} className="mt-6 grid gap-3 md:grid-cols-[1.4fr_.8fr_.55fr_.55fr_auto]">
        <input
          value={draft.title}
          onChange={(event) => setDraft({ ...draft, title: event.target.value })}
          placeholder="Add a focus task"
          className="h-12 rounded-2xl border border-white/15 bg-white/50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 dark:bg-slate-950/45 dark:text-white"
        />
        <select
          value={draft.subject}
          onChange={(event) => setDraft({ ...draft, subject: event.target.value })}
          className="h-12 rounded-2xl border border-white/15 bg-white/50 px-4 text-sm text-slate-900 outline-none dark:bg-slate-950/45 dark:text-white"
        >
          {subjects.map((subject) => (
            <option key={subject.id}>{subject.name}</option>
          ))}
        </select>
        <input
          value={draft.minutes}
          min="5"
          type="number"
          onChange={(event) => setDraft({ ...draft, minutes: event.target.value })}
          className="h-12 rounded-2xl border border-white/15 bg-white/50 px-4 text-sm text-slate-900 outline-none dark:bg-slate-950/45 dark:text-white"
        />
        <select
          value={draft.priority}
          onChange={(event) => setDraft({ ...draft, priority: event.target.value })}
          className="h-12 rounded-2xl border border-white/15 bg-white/50 px-4 text-sm text-slate-900 outline-none dark:bg-slate-950/45 dark:text-white"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950"
            title={editingId ? "Save task" : "Add task"}
          >
            {editingId ? <Save size={18} /> : <Plus size={18} />}
          </motion.button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setDraft(emptyTask);
              }}
              title="Cancel edit"
              className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/20 text-slate-600 dark:text-slate-300"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 space-y-3">
        <AnimatePresence initial={false}>
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -24, scale: 0.96 }}
              transition={{ delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3 rounded-3xl border border-white/12 bg-white/35 p-3 backdrop-blur-xl dark:bg-slate-950/35"
            >
              <button
                onClick={() => setTasks((current) => current.map((item) => (item.id === task.id ? { ...item, done: !item.done } : item)))}
                title={task.done ? "Mark incomplete" : "Mark complete"}
                className={`grid size-10 place-items-center rounded-2xl border transition ${
                  task.done
                    ? "border-cyan-300 bg-cyan-300 text-slate-950"
                    : "border-white/15 bg-white/20 text-slate-500 dark:text-slate-300"
                }`}
              >
                <Check size={17} />
              </button>
              <div className="min-w-[210px] flex-1">
                <p className={`font-medium ${task.done ? "text-slate-400 line-through" : "text-slate-950 dark:text-white"}`}>{task.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{task.subject} / {task.minutes} min / {task.priority}</p>
              </div>
              <button onClick={() => beginEdit(task)} title="Edit task" className="grid size-10 place-items-center rounded-2xl text-slate-500 transition hover:bg-white/30 dark:text-slate-300">
                <Edit3 size={17} />
              </button>
              <button onClick={() => setTasks((current) => current.filter((item) => item.id !== task.id))} title="Delete task" className="grid size-10 place-items-center rounded-2xl text-rose-400 transition hover:bg-rose-500/10">
                <Trash2 size={17} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </PremiumCard>
  );
}
