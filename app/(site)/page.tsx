import Header from '@/components/Header';
import Container from '@/components/Container';
import Section from '@/components/Section';
import { SITE } from '@/lib/constants';
import HeroCarousel from '@/components/HeroCarousel';
import InfoStrip from '@/components/InfoStrip';
import FeatureTiles from '@/components/FeatureTiles';
import DonateCTA from '@/components/DonateCTA';
import VideosClient from '@/components/VideosClient';
import YTUploadsEmbed from '@/components/YTUploadsEmbed';

export const metadata = {
  title: 'Igreja do Evangelho da Graça — Amar • Servir • Anunciar',
  description:
    'Seja bem-vindo(a) à Igreja do Evangelho da Graça. Junte-se a nós para adorar, aprender e servir.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* topo fixo */}


      {/* 1) Carrossel */}
      <HeroCarousel />

      {/* 2) Hero principal */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white" />
        <Container>
          <div className="py-10 sm:py-14 md:py-20 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <h1 className="font-extrabold tracking-tight leading-tight text-[clamp(2rem,6vw,3.5rem)]">
                Bem-vindo(a) à{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Igreja do Evangelho da Graça
                </span>
              </h1>
              <p className="mt-4 text-slate-600 max-w-prose">
                Uma comunidade que vive e anuncia o evangelho de Jesus com
                simplicidade, amor e serviço.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                <a
                  href={SITE.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-blue-600 text-white px-4 py-2.5 sm:px-5 hover:bg-blue-700 transition"
                >
                  Assistir no YouTube
                </a>
                <a
                  href="/programacao"
                  className="rounded-2xl border border-slate-300 px-4 py-2.5 sm:px-5 hover:border-blue-500 hover:text-blue-600 transition"
                >
                  Ver programação
                </a>
                <a
                  href="/visite"
                  className="rounded-2xl border border-slate-300 px-4 py-2.5 sm:px-5 hover:border-blue-500 hover:text-blue-600 transition"
                >
                  Visite-nos
                </a>
              </div>
            </div>

            {/* vídeo destaque */}
            <YTUploadsEmbed className="rounded-3xl border border-slate-200 shadow-sm overflow-hidden bg-white" />
          </div>
        </Container>
      </Section>

      {/* 3) Informações rápidas */}
      <InfoStrip />

      {/* 4) Atalhos */}
      <Section>
        <Container>
          <FeatureTiles />
        </Container>
      </Section>

      {/* 5) Doação */}
      <DonateCTA />

      {/* 6) Últimas mensagens */}
      <Section id="mensagens" className="bg-slate-50 border-y border-slate-200">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Mensagens</h2>
            <a
              className="text-sm text-blue-600 hover:underline"
              href={SITE.youtube}
              target="_blank"
              rel="noreferrer"
            >
              Ver canal →
            </a>
          </div>
          <div className="mt-6">
            <VideosClient initialLimit={9} />
          </div>
        </Container>
      </Section>

      {/* 7) Localização */}
      <Section>
        <Container>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Como chegar</h2>
              <p className="mt-3 text-slate-600">
                Estamos te esperando! Queremos te receber e orar com você.
              </p>
              <a
                href="https://maps.google.com/?q=Igreja%20do%20Evangelho%20da%20Gra%C3%A7a"
                target="_blank"
                className="mt-4 inline-block rounded-2xl border border-slate-300 px-5 py-2.5 hover:border-blue-500 hover:text-blue-600 transition"
                rel="noreferrer"
              >
                Abrir no Google Maps
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe
                title="Mapa IEG"
                className="w-full h-[320px]"
                loading="lazy"
                src="https://www.google.com/maps?q=Igreja%20do%20Evangelho%20da%20Gra%C3%A7a&output=embed"
              />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
