import Image from 'next/image';
import Container from '@/components/Container';
import Section from '@/components/Section';
import {
  Cross,
  Users,
  HeartHandshake,
  BookOpenCheck,
  UsersRound,
  MapPin,
  Church,
  Star,
} from 'lucide-react';

export default function SobrePage() {
  return (
    <Section id="sobre" className="pb-20 pt-10">
      <Container>

        {/* FOTO */}
        <div className="relative w-full h-60 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/images/igreja.jpg" // <--- troque por sua imagem real
            alt="Igreja do Evangelho da Graça em Floriano"
            fill
            className="object-cover"
          />
        </div>

        {/* TÍTULO */}
        <h2 className="mt-10 text-3xl font-bold tracking-tight text-blue-700 flex items-center gap-2">
          <Church className="h-8 w-8 text-blue-700" />
          Quem Somos
        </h2>

        {/* TEXTO PRINCIPAL */}
        <div className="mt-4 space-y-6 text-slate-700 max-w-prose leading-relaxed">

          <p>
            A <strong>Igreja do Evangelho da Graça</strong> nasceu no coração de Deus há mais de
            <strong> 27 anos</strong>, fundada pelo <strong>Pastor Jorge Matos</strong> na cidade de Teresina – PI.
            O nome da igreja surgiu a partir de uma revelação em 
            <strong> Atos 20:24</strong>, onde o apóstolo Paulo declara:
          </p>

          <blockquote className="border-l-4 border-blue-600 pl-4 italic text-slate-600">
            “Contanto que eu complete a minha carreira e o ministério que recebi do Senhor Jesus,
            para testemunhar o Evangelho da Graça de Deus.”
          </blockquote>

          <p>
            Inspirado por essa Palavra, o Pastor Jorge entendeu que a missão da igreja seria clara:
            <strong> anunciar a Graça de Cristo, formar discípulos e servir pessoas com amor</strong>.
          </p>

          <p>
            Hoje a igreja continua crescendo, e há <strong>18 anos</strong>, chegou também à cidade de
            <strong> Floriano – PI</strong>, onde seguimos vivendo essa mesma missão. A congregação local é liderada pelo
            <strong> Pastor Afonso Nunes</strong>, sob cobertura espiritual da
            <strong> Pastora Presidente Andrea Vieira</strong>, responsável pela igreja-mãe em Teresina.
          </p>

        </div>

        {/* SEÇÕES COM ÍCONES */}
        <div className="mt-10 grid sm:grid-cols-2 gap-8 max-w-3xl">

          {/* Discipulado */}
          <div className="flex items-start gap-4">
            <BookOpenCheck className="h-8 w-8 text-blue-600 shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-700">Discipulado</h3>
              <p className="text-slate-600 text-sm">
                Ajudamos cada pessoa a crescer espiritualmente e desenvolver
                uma caminhada sólida com Cristo.
              </p>
            </div>
          </div>

          {/* Comunhão */}
          <div className="flex items-start gap-4">
            <Users className="h-8 w-8 text-blue-600 shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-700">Comunhão</h3>
              <p className="text-slate-600 text-sm">
                Somos uma família espiritual, vivendo unidade, cuidado e vida em comunidade.
              </p>
            </div>
          </div>

          {/* Serviço */}
          <div className="flex items-start gap-4">
            <HeartHandshake className="h-8 w-8 text-blue-600 shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-700">Serviço</h3>
              <p className="text-slate-600 text-sm">
                Abençoamos a cidade com ações práticas, projetos sociais e apoio às famílias.
              </p>
            </div>
          </div>

          {/* Missão */}
          <div className="flex items-start gap-4">
            <Cross className="h-8 w-8 text-blue-600 shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-700">Missão</h3>
              <p className="text-slate-600 text-sm">
                Nosso foco é anunciar Jesus, alcançar vidas e cumprir o
                chamado do Evangelho da Graça.
              </p>
            </div>
          </div>

        </div>

        {/* PASTORES */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            <UsersRound className="h-6 w-6 text-blue-700" />
            Nossos Pastores
          </h3>

          <ul className="space-y-3 text-slate-700">
            <li>
              <strong>Pr. Jorge Matos</strong> — Fundador e idealizador do ministério, inspirado por Atos 20:24.
            </li>
            <li>
              <strong>Pra. Andrea Vieira</strong> — Pastora Presidente da igreja-mãe em Teresina – PI.
            </li>
            <li>
              <strong>Pr. Afonso Nunes</strong> — Pastor responsável pela igreja em Floriano – PI.
            </li>
          </ul>
        </div>

        {/* FINAL */}
        <p className="mt-12 font-medium text-blue-700 text-lg flex items-center gap-2">
          <Star className="h-5 w-5 text-blue-600" />
          Igreja do Evangelho da Graça — Amar • Servir • Anunciar
        </p>

      </Container>
    </Section>
  );
}
