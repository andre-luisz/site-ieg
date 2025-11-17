export default function VideoCard({
  id,
  title,
  thumbnail,
  onPlay,
}: {
  id: string;
  title: string;
  thumbnail: string;
  onPlay?: (payload: { id: string; title: string }) => void;
}) {
  return (
    <article
      className="rounded-3xl border border-slate-200 overflow-hidden bg-white hover:shadow-sm transition-shadow cursor-pointer"
      onClick={() => onPlay?.({ id, title })}
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full aspect-video object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <p className="font-medium line-clamp-2">{title}</p>
      </div>
    </article>
  );
}
