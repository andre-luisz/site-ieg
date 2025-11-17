'use client';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu, { MobileLink } from './MobileMenu';
import {
  Info,
  CalendarDays,
  Users,
  PlaySquare,
  Mail,
  HandCoins,
} from 'lucide-react';

const LINKS: MobileLink[] = [
  { label: 'Sobre', href: '/sobre', icon: Info },
  { label: 'Programação', href: '/programacao', icon: CalendarDays },
  { label: 'Momentos da Igreja', href: '/momentos', icon: Users },
  { label: 'Mensagens', href: '/mensagens', icon: PlaySquare },
  { label: 'Contato', href: '/contato', icon: Mail },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            width={36}
            height={36}
            alt="Igreja do Evangelho da Graça"
            className="rounded-xl"
            priority
          />
          <div className="leading-tight">
            <span className="font-semibold">Igreja do Evangelho da Graça</span>
            <span className="block text-xs text-slate-500">Amar • Servir • Anunciar</span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {LINKS.map((l) => {
  const Icon = l.icon;
  return (
    <Link
      key={l.href}
      href={l.href}
      className="hover:text-blue-600 flex items-center gap-1.5"
    >
      <Icon size={16} className="text-blue-600/70" />
      {l.label}
    </Link>
  );
})}

          {/* BOTÃO DOAR */}
          <Link
            href="/doar"
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
          >
            <HandCoins size={18} /> Doar
          </Link>
        </nav>

        {/* MOBILE */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/doar"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700 transition"
          >
            <HandCoins size={16} /> Doar
          </Link>
          <MobileMenu links={LINKS} ctaLabel="Doar" ctaHref="/doar" />
        </div>
      </div>
    </header>
  );
}
