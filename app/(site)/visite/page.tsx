import Container from '@/components/Container';
import Section from '@/components/Section';
import { SITE } from '@/lib/constants';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Navigation2,
  Clock,
} from 'lucide-react';

const MAPS_LINK = 'https://maps.app.goo.gl/n7Gj6Na37M6yM4W19';

export default function VisitePage() {
  return (
    <Section
      id="visite"
      className="bg-slate-50 border-y border-slate-200 py-12 md:py-16"
    >
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* COLUNA ESQUERDA – TEXTO E CONTATO */}
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-blue-700">
                  Visite-nos
                </h2>
                <p className="text-sm text-slate-500">
                  Será um prazer receber você e sua família.
                </p>
              </div>
            </div>

            {/* ENDEREÇO */}
            <div className="mt-5 text-slate-700 text-sm space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-blue-600" />
                <p>{SITE.address}</p>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-blue-600" />
                <p>
                  <span className="font-medium">Reuniões semanais:</span>
                  <br />
                  Cultos de celebração, Cultos de jovens, EBD e cultos
                  domésticos ao longo da semana.
                </p>
              </div>
            </div>

            {/* CONTATO */}
            <div className="mt-6 text-sm space-y-2 text-slate-700">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <p>
                  <span className="font-medium">WhatsApp:</span> {SITE.whatsapp}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <p>
                  <span className="font-medium">E-mail:</span> {SITE.email}
                </p>
              </div>
            </div>

            {/* REDES SOCIAIS */}
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3.5 py-1.5 hover:border-pink-500 hover:text-pink-600 transition"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
              <a
                href={SITE.youtube}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3.5 py-1.5 hover:border-red-500 hover:text-red-600 transition"
              >
                <Youtube className="h-4 w-4" />
                YouTube
              </a>
            </div>

            {/* CHAMADA */}
            <p className="mt-6 text-xs text-slate-500 max-w-sm">
              Se você ainda não nos conhece, sinta-se à vontade para nos fazer uma visita.
              Será uma alegria receber você, ouvir sua história e caminhar juntos em fé.
            </p>
          </div>

          {/* COLUNA DIREITA – MAPA */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Navigation2 className="h-4 w-4 text-blue-600" />
                <span>Como chegar</span>
              </div>
              <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] uppercase tracking-wide text-slate-500">
                Google Maps
              </span>
            </div>

            <iframe
              title="Mapa da Igreja do Evangelho da Graça"
              className="w-full h-[320px]"
              // 👉 Cole aqui o src que o Google Maps gerar no "Incorporar um mapa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.0151982776474!2d-43.03015682500497!3d-6.768000393228808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7837d305b3d8b61%3A0x80ebfb1e70db8078!2sIGREJA%20DO%20EVANGELHO%20DA%20GRA%C3%87A!5e0!3m2!1spt-BR!2sbr!4v1763385671573!5m2!1spt-BR!2sbr"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="px-4 py-3 border-t border-slate-100 flex justify-end">
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                <Navigation2 className="h-3 w-3" />
                Abrir rota no Google Maps
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
