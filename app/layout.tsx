// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iegfloriano.site'),
  title: {
    default: 'Igreja do Evangelho da Graça • Floriano',
    template: '%s — Igreja do Evangelho da Graça',
  },
  description:
    'Igreja do Evangelho da Graça em Floriano - PI. Amar, servir e anunciar o Evangelho de Jesus por meio de cultos, discipulado, Escola Bíblica, ações sociais e comunhão.',
  keywords: [
    'igreja do evangelho da graça',
    'igreja floriano',
    'igreja evangelica floriano',
    'igreja evangelica em floriano pi',
    'culto floriano',
    'igreja cristã floriano',
    'EBD Floriano',
    'cultos domésticos Floriano',
  ],
  alternates: {
    canonical: 'https://iegfloriano.site',
  },
  openGraph: {
    title: 'Igreja do Evangelho da Graça • Floriano',
    description:
      'Conheça a Igreja do Evangelho da Graça em Floriano - PI. Cultos, mensagens, Escola Bíblica, juventude e ações sociais.',
    url: 'https://iegfloriano.site',
    siteName: 'Igreja do Evangelho da Graça',
    images: [
      {
        url: '/og-image.jpg', // depois você cria essa imagem (1200x630) na pasta public
        width: 1200,
        height: 630,
        alt: 'Igreja do Evangelho da Graça em Floriano',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} font-sans bg-white text-slate-900 antialiased`}
      >
        <Header />
        <main>{children}</main>

        {/* footer bonito */}
        <footer className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
                  Igreja do Evangelho da Graça
                </h3>
                <p className="mt-3 text-sm text-slate-600 max-w-xs">
                  Amar • Servir • Anunciar — vivendo e pregando o Evangelho de
                  Jesus com simplicidade e amor.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
                  Páginas
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/programacao" className="hover:text-blue-600">
                      Programação
                    </a>
                  </li>
                  <li>
                    <a href="/mensagens" className="hover:text-blue-600">
                      Mensagens
                    </a>
                  </li>
                  <li>
                    <a href="/doar" className="hover:text-blue-600">
                      Doar
                    </a>
                  </li>
                  <li>
                    <a href="/visite" className="hover:text-blue-600">
                      Visite-nos
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
                  Conecte-se
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.youtube.com/@igrejadoevangelhodagraca"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-600"
                    >
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/ieg_floriano"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-600"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
                  Endereço
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  Rua São João, 915, Irapuá I — Floriano, PI <br />
                  Cultos: Dom às 19h, Qua e Sex às 19h30
                </p>
                <a
                  href="https://maps.google.com/?q=Igreja%20do%20Evangelho%20da%20Gra%C3%A7a%20Floriano%20PI"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-blue-600 hover:underline text-sm"
                >
                  Ver no mapa →
                </a>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
              © {year} Igreja do Evangelho da Graça — Amar • Servir • Anunciar
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
