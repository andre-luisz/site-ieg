export default function EventCard({ date, title, excerpt, href }: { date: string; title: string; excerpt: string; href?: string }) {
return (
<article className="rounded-3xl border border-slate-200 p-5 bg-white hover:shadow-sm transition-shadow">
<p className="text-xs uppercase tracking-wide text-slate-500">{date}</p>
<h3 className="mt-1 font-semibold">{title}</h3>
<p className="mt-2 text-sm text-slate-600">{excerpt}</p>
{href && <a href={href} className="mt-3 inline-block text-sm text-blue-600 hover:underline">Detalhes</a>}
</article>
);
}