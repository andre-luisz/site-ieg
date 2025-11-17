export default function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white">
      <div className="w-full aspect-video animate-pulse bg-slate-200" />
      <div className="p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}
