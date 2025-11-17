// components/BannersDesktop.tsx
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export default function BannersDesktop() {
  return (
    // só exibe do breakpoint md pra cima
    <div className="hidden md:block bg-gradient-to-b from-white to-blue-50/30">
      <Container>
        <div className="py-6 space-y-4">
          {/* Banner YouTube */}
          <Link
            href="https://www.youtube.com/@igrejadoevangelhodagraca"
            target="_blank"
            className="block rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow transition-shadow"
            aria-label="Assista no YouTube"
          >
            <Image
              src="/banners/youtube.png"
              alt="Assista no YouTube - Inscreva-se"
              width={1920}
              height={275}
              sizes="(min-width: 1024px) 1200px, 100vw"
              priority
              className="w-full h-auto"
            />
          </Link>

          {/* Banner Cultos da Semana */}
          <Link
            href="/programacao"
            className="block rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow transition-shadow"
            aria-label="Cultos da semana"
          >
            <Image
              src="/banners/cultos.png"
              alt="Cultos da semana - horários"
              width={1920}
              height={275}
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="w-full h-auto"
            />
          </Link>

          {/* Banner PIX */}
          <Link
            href="/doar"
            className="block rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow transition-shadow"
            aria-label="Ajude essa obra com Pix"
          >
            <Image
              src="/banners/pix.png"
              alt="Ajude essa obra com PIX"
              width={2100}
              height={300}
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="w-full h-auto"
            />
          </Link>
        </div>
      </Container>
    </div>
  );
}
