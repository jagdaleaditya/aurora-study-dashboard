export function SkeletonLoader() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950">
      <div className="w-full max-w-5xl px-6">
        <div className="mb-8 h-14 w-80 rounded-3xl bg-white/10 shimmer" />
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-40 rounded-[28px] border border-white/10 bg-white/10 shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}
