'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

export type MobileLink = {
  label: string;
  href: string;
  icon: LucideIcon; // 👈 AGORA O TS VAI ACEITAR
};

export default function MobileMenu({
  links,
  ctaLabel = 'Doar',
  ctaHref = '/doar',
}: {
  links: MobileLink[];
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  // bloquear scroll de fundo + restaurar foco
  useEffect(() => {
    if (open) {
      lastActiveRef.current = (document.activeElement as HTMLElement) ?? null;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      lastActiveRef.current?.focus?.();
    }
  }, [open]);

  // teclado: Esc e trap básico de Tab
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab') {
        const root = panelRef.current;
        if (!root) return;
        const focusables = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement;

        if (!e.shiftKey && active === last) {
          e.preventDefault(); first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault(); last.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // foca o primeiro item ao abrir
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();
  }, [open]);

  return (
    <>
      {/* botão hambúrguer */}
      <button
        aria-label="Abrir menu"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-2 text-sm hover:border-blue-500 hover:text-blue-600 transition"
      >
        ☰
      </button>

      {/* drawer + backdrop */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* backdrop SÓLIDO (sem transparência) */}
          <button
            aria-label="Fechar menu"
            className="absolute inset-0 bg-black"
            onClick={() => setOpen(false)}
          />
          {/* painel */}
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute right-0 top-0 h-full w-[88%] max-w-xs bg-white shadow-2xl border-l border-slate-200 translate-x-0 animate-slideIn"
          >
            <div className="flex items-center justify-between px-4 h-14 border-b border-slate-200 bg-white">
              <span className="font-semibold">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-300 px-2 py-1 text-sm hover:border-blue-500 hover:text-blue-600 transition"
              >
                Fechar ✕
              </button>
            </div>

            <nav className="px-3 py-3">
              <ul className="space-y-1">
                {links.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100"
                    >
                      {Icon ? <Icon size={18} className="text-slate-500" /> : <span className="w-[18px]" />}
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 px-3">
                <Link
                  href={ctaHref}
                  onClick={() => setOpen(false)}
                  className="block text-center rounded-2xl bg-blue-600 text-white px-4 py-2.5 hover:bg-blue-700 transition"
                >
                  {ctaLabel}
                </Link>
              </div>
            </nav>

            <div className="mt-auto px-4 py-4 text-xs text-slate-500">
              © {new Date().getFullYear()} Igreja do Evangelho da Graça
            </div>
          </div>
        </div>
      )}

      {/* animação */}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: .92; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn { animation: slideIn .18s ease-out; }
      `}</style>
    </>
  );
}
