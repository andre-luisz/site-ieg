// components/BannersMobile.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Slide = {
  id: string;
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const slides: Slide[] = [
  {
    id: 'yt',
    href: 'https://www.youtube.com/@igrejadoevangelhodagraca',
    src: '/banners/mobile/youtube-m.png',
    alt: 'Assista no YouTube - Inscreva-se',
    width: 1200,
    height: 600,
  },
  {
    id: 'cultos',
    href: '/programacao',
    src: '/banners/mobile/cultos-m.png',
    alt: 'Cultos da Semana',
    width: 1200,
    height: 600,
  },
  {
    id: 'pix',
    href: '/doar',
    src: '/banners/mobile/pix-m.png',
    alt: 'Ajude essa obra com Pix',
    width: 1200,
    height: 600,
  },
];

export default function BannersMobile() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  // atualiza ponto ativo quando o usuário desliza
  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    function onScroll() {
      const current = trackRef.current;
      if (!current) return;

      const idx = Math.round(current.scrollLeft / current.clientWidth);
      setActive(Math.max(0, Math.min(slides.length - 1, idx)));
    }

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
    setActive(clamped);
  };

  return (
    // só aparece em mobile
    <div className="md:hidden">
      <div className="relative">
        {/* track */}
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {slides.map((s) => (
            <div key={s.id} className="min-w-full snap-start px-4">
              <Link
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                className="block rounded-2xl overflow-hidden border border-slate-200 shadow-sm active:scale-[0.99] transition"
                aria-label={s.alt}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  sizes="100vw"
                  className="w-full h-auto"
                  onError={(e) => {
                    // fallback pras imagens desktop se a mobile não existir
                    const img = e.currentTarget as HTMLImageElement & {
                      srcset?: string;
                    };
                    if (s.src.includes('/mobile/')) {
                      img.src = s.src.replace('/mobile/', '/');
                      if (img.srcset) img.srcset = '';
                    }
                  }}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* dots */}
        <div className="absolute inset-x-0 -bottom-2 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para banner ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition ${
                active === i ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>

        {/* arrows */}
        <div className="absolute inset-y-0 left-0 right-0 pointer-events-none">
          <div className="flex items-center justify-between h-full">
            <button
              onClick={() => goTo(active - 1)}
              className="pointer-events-auto mx-1 rounded-full bg-white/90 shadow p-1 text-slate-700"
              aria-label="Anterior"
              disabled={active === 0}
            >
              ⟵
            </button>
            <button
              onClick={() => goTo(active + 1)}
              className="pointer-events-auto mx-1 rounded-full bg-white/90 shadow p-1 text-slate-700"
              aria-label="Próximo"
              disabled={active === slides.length - 1}
            >
              ⟶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* util: esconda scrollbar no mobile */
// Adicione isso em globals.css se ainda não tiver:
/*
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
*/
