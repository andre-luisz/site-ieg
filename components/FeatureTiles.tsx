import Link from 'next/link';

function Tile({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition block"
    >
      <p className="text-base sm:text-lg font-semibold">{title}</p>
      <p className="text-slate-600 mt-1 text-sm">{desc}</p>
      <span className="mt-3 inline-block text-blue-600 text-sm">Acessar →</span>
    </Link>
  );
}

export default function FeatureTiles() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <Tile title="Programação" desc="Veja os próximos cultos e eventos." href="/programacao" />
      <Tile title="Mensagens" desc="Assista às últimas pregações." href="/mensagens" />
      <Tile title="Doar" desc="Apoie esta obra com sua oferta." href="/doar" />
    </div>
  );
}
