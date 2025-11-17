export default function YTEmbed({ id, title }: { id: string; title?: string }) {
return (
<div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
<div className="aspect-video">
<iframe
className="w-full h-full"
src={`https://www.youtube.com/embed/${id}`}
title={title ?? 'Mensagem IEG'}
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
/>
</div>
{title && <div className="p-4"><p className="text-sm text-slate-600">{title}</p></div>}
</div>
);
}