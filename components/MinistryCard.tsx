export default function MinistryCard({ title, description }: { title: string; description: string }) {
return (
<div className="rounded-3xl border border-slate-200 p-6 bg-white">
<p className="font-semibold">{title}</p>
<p className="text-sm text-slate-600 mt-2">{description}</p>
<a href="#" className="mt-3 inline-block text-sm text-blue-600 hover:underline">Quero participar</a>
</div>
);
}