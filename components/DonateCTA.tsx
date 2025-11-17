import Image from 'next/image';
import Link from 'next/link';

export default function DonateCTA() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50/30 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-[clamp(1.25rem,4vw,2rem)] font-bold">Ajude essa obra 💙</h2>
            <p className="mt-3 text-slate-600">
              Sua oferta nos ajuda a alcançar mais pessoas com o Evangelho.
            </p>
            <div className="mt-5 flex gap-3">
              <Link
                href="/doar"
                className="rounded-2xl bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700 transition"
              >
                Doar agora
              </Link>
              <a
                href="https://www.youtube.com/@igrejadoevangelhodagraca"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-300 px-5 py-2.5 hover:border-blue-500 hover:text-blue-600 transition"
              >
                Ver transparência
              </a>
            </div>
          </div>

          {/* banner + slot do QR */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <Image
              src="/banners/pix.png"
              alt="Ajude essa obra com Pix"
              width={2100}
              height={300}
              className="w-full h-auto"
              priority={false}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}
