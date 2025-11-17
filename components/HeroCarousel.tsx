'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

type Slide = {
  id: string;
  href: string;
  alt: string;
  desktop: string; // /banners/xxx.png
  mobile: string;  // /banners/mobile/xxx-m.png (pode repetir a desktop)
};

const SLIDES: Slide[] = [
  {
    id: 'yt',
    href: 'https://www.youtube.com/@igrejadoevangelhodagraca',
    alt: 'Assista no YouTube - Inscreva-se',
    desktop: '/banners/youtube.png',
    mobile: '/banners/mobile/youtube-m.png',
  },
  {
    id: 'cultos',
    href: '/programacao',
    alt: 'Cultos da semana',
    desktop: '/banners/cultos.png',
    mobile: '/banners/mobile/cultos-m.png',
  },
  {
    id: 'pix',
    href: '/doar',
    alt: 'Ajude essa obra com Pix',
    desktop: '/banners/pix.png',
    mobile: '/banners/mobile/pix-m.png',
  },
];

export default function HeroCarousel() {
  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const prev = () => emblaApi?.scrollPrev();
  const next = () => emblaApi?.scrollNext();
  const scrollTo = (i: number) => emblaApi?.scrollTo(i);

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {SLIDES.map((s, i) => (
            <div key={s.id} className="flex-[0_0_100%]">
              <Link
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                aria-label={s.alt}
                className="block select-none"
                draggable={false}
              >
                <picture>
                  <source media="(min-width: 768px)" srcSet={s.desktop} />
                  <img
                    src={s.mobile}
                    alt={s.alt}
                    className="block w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                </picture>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* setas */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 md:px-6">
        <button
          onClick={prev}
          className="pointer-events-auto rounded-full bg-white/90 hover:bg-white shadow p-2 text-slate-700 transition"
          aria-label="Anterior"
        >
          ⟵
        </button>
        <button
          onClick={next}
          className="pointer-events-auto rounded-full bg-white/90 hover:bg-white shadow p-2 text-slate-700 transition"
          aria-label="Próximo"
        >
          ⟶
        </button>
      </div>

      {/* pontos */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Ir para banner ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition ${
              selected === i ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
