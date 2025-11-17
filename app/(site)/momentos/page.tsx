import Container from '@/components/Container';
import Section from '@/components/Section';
import MomentosClient from '@/components/MomentosClient';
import { Church } from 'lucide-react';

export const metadata = {
  title: 'Momentos da Igreja — Igreja do Evangelho da Graça',
  description:
    'Veja registros de cultos, eventos, ações sociais e celebrações da Igreja do Evangelho da Graça.',
};

export default function MomentosPage() {
  return (
    <Section className="pb-20 pt-10">
      <Container>
        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex flex-col items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm">
              <Church className="h-6 w-6" />
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
              Momentos da Igreja
            </h1>
          </div>
          <p className="mt-3 text-slate-600">
            Fotos de cultos, eventos, ações sociais e celebrações. Aqui você vê
            um pouco do que Deus tem feito em nosso meio.
          </p>
        </div>

        {/* Lista de categorias + fotos */}
        <MomentosClient />

        {/* Rodapé */}
        <div className="mt-16 text-center text-sm text-slate-600">
          <p>
            “Porque onde estiverem dois ou três reunidos em meu nome, aí estou
            eu no meio deles.” <span className="italic">(Mateus 18:20)</span>
          </p>
        </div>
      </Container>
    </Section>
  );
}
