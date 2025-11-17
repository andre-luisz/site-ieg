import Container from '@/components/Container';
import Section from '@/components/Section';
import {
  LucideIcon,
  CalendarDays,
  HeartHandshake,
  Home,
  Activity,
  Music2,
  BookOpen,
  Users,
  Wine,
} from 'lucide-react';

export const metadata = {
  title: 'Programação — Igreja do Evangelho da Graça',
  description:
    'Confira os dias e horários dos cultos e atividades da Igreja do Evangelho da Graça.',
};

type Evento = {
  dia: string;
  titulo: string;
  hora: string;
  descricao: string;
  icon: LucideIcon;
};

const eventosSemana: Evento[] = [
  {
    dia: 'Terça-feira',
    titulo: 'Círculo de Oração',
    hora: '19h00',
    descricao: 'Momento de intercessão e clamor pela igreja, famílias e cidade.',
    icon: HeartHandshake, // oração / cuidado
  },
  {
    dia: 'Quarta-feira',
    titulo: 'Culto da Vitória',
    hora: '19h30',
    descricao:
      'Apresentamos nossos projetos de vida e buscamos a direção do Senhor.',
    icon: CalendarDays, // destaque de dia/propósito
  },
  {
    dia: 'Quinta-feira',
    titulo: 'Culto Doméstico',
    hora: '19h30',
    descricao:
      'Reunião nas casas dos irmãos, fortalecendo a fé e a comunhão em família.',
    icon: Home,
  },
  {
    dia: 'Sexta-feira',
    titulo: 'Culto de Cura e Libertação',
    hora: '19h30',
    descricao:
      'Tempo especial de ministração, oração por cura, restauração e libertação.',
    icon: Activity, // “batimentos”/vida
  },
  {
    dia: 'Sábado',
    titulo: 'Ensaio de Louvor',
    hora: '16h00',
    descricao:
      'Ensaio do ministério de louvor, preparando a adoração para os cultos.',
    icon: Music2,
  },
  {
    dia: 'Domingo',
    titulo: 'Escola Bíblica Dominical (EBD)',
    hora: '09h00',
    descricao:
      'Estudo da Palavra para todas as idades, fortalecendo o conhecimento bíblico.',
    icon: BookOpen,
  },
  {
    dia: 'Domingo',
    titulo: 'Culto da Sagrada Família',
    hora: '19h00',
    descricao:
      'Celebração em família, consagrando a semana ao Senhor e edificando lares.',
    icon: Home,
  },
];

const eventosMensais: Evento[] = [
  {
    dia: '2º Sábado de cada mês',
    titulo: 'Culto de Jovens',
    hora: '19h00',
    descricao:
      'Reunião especial com foco na juventude, adoração e Palavra direcionada aos jovens.',
    icon: Users,
  },
  {
    dia: '1º Domingo de cada mês',
    titulo: 'Culto de Santa Ceia',
    hora: '19h00',
    descricao:
      'Celebração da Ceia do Senhor, momento de memória, gratidão e renovação da aliança.',
    icon: Wine,
  },
];

export default function ProgramacaoPage() {
  return (
    <Section>
      <Container>
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
            Programação da Igreja
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Veja os dias e horários dos cultos e participe conosco! Há um tempo
            especial preparado para você e sua família.
          </p>
        </div>

        {/* Programação semanal */}
        <section aria-labelledby="semana">
          <h2
            id="semana"
            className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4"
          >
            Programação semanal
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventosSemana.map((e, i) => {
              const Icon = e.icon;
              return (
                <article
                  key={`${e.dia}-${e.titulo}-${i}`}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition p-5 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        {e.dia}
                      </p>
                      <p className="text-sm font-medium text-slate-700">
                        {e.hora}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {e.titulo}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                    {e.descricao}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Programação mensal */}
        <section aria-labelledby="mensal" className="mt-12">
          <h2
            id="mensal"
            className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4"
          >
            Cultos mensais
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {eventosMensais.map((e, i) => {
              const Icon = e.icon;
              return (
                <article
                  key={`${e.dia}-${e.titulo}-${i}`}
                  className="rounded-2xl border border-amber-200 bg-amber-50/80 shadow-sm hover:shadow-md transition p-5 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-amber-700">
                        {e.dia}
                      </p>
                      <p className="text-sm font-medium text-amber-800">
                        {e.hora}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-amber-900">
                    {e.titulo}
                  </h3>
                  <p className="mt-2 text-sm text-amber-800 leading-relaxed flex-1">
                    {e.descricao}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mt-12 text-center text-slate-600">
          <p>
            “Alegrei-me quando me disseram: Vamos à casa do Senhor.”
            <span className="italic"> (Salmos 122:1)</span>
          </p>
        </div>
      </Container>
    </Section>
  );
}
