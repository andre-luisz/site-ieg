import Container from '@/components/Container';
import Section from '@/components/Section';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Doar — Igreja do Evangelho da Graça',
  description:
    'Apoie a Igreja do Evangelho da Graça com sua oferta e participe do Mercado Solidário Unidos em Amor.',
};

const UNIDOS_URL = 'https://unidosemamor-cqxj.vercel.app/';

export default function DoarPage() {
  return (
    <Section>
      <Container>
        {/* Título + intro */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
            Seja parte do que Deus está fazendo
          </h1>
          <p className="mt-3 text-slate-600">
            Suas ofertas nos ajudam a anunciar o Evangelho, alcançar vidas e
            investir em projetos que abençoam pessoas dentro e fora da igreja.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Coluna esquerda – explicação + Mercado Solidário */}
          <div className="space-y-6">
            {/* PIX / oferta geral */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
              <h2 className="text-xl font-semibold text-slate-900">
                Doe via Pix
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Você pode enviar sua oferta diretamente para a igreja usando a
                chave Pix abaixo ou o QR Code ao lado. Toda contribuição é
                administrada com responsabilidade e temor a Deus.
              </p>

              {/* coloque aqui sua chave pix real */}
              <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-left">
                <p className="font-semibold text-slate-800">Chave Pix:</p>
                <p className="mt-1 text-slate-700 break-all">
                  {/* Exemplo – troque pela sua chave real */}
                  SEU-PIX-AQUI@seubanco.com.br
                </p>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Após realizar a transferência, você pode enviar o comprovante
                para a liderança ou ministério financeiro da igreja.
              </p>
            </div>

            {/* Mercado Solidário Unidos em Amor */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 to-sky-50 shadow-sm p-5">
              <h2 className="text-xl font-semibold text-slate-900">
                Unidos em Amor — Mercado Solidário
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Além de ofertas diretas, você também pode abençoar a obra
                participando do nosso mercado solidário{' '}
                <span className="font-semibold">“Unidos em Amor”</span>.
                Doando e contribuindo por lá, você ajuda projetos
                assistenciais e sociais ligados à igreja.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={UNIDOS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-blue-700 transition"
                >
                  Acessar Unidos em Amor
                </Link>
                <p className="text-xs text-slate-500 max-w-xs">
                  Você será redirecionado para o site Unidos em amor.
                </p>
              </div>
            </div>
          </div>

          {/* Coluna direita – QR prédio próprio */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-slate-900 text-center">
              Campanha: Nosso Prédio Próprio
            </h2>
            <p className="mt-2 text-sm text-slate-600 text-center">
              Ajude-nos a conquistar o prédio próprio da Igreja do Evangelho da
              Graça. Faça uma oferta especial usando o QR Code abaixo.
            </p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              {/* 
                Troque o src abaixo pelo arquivo real do seu QR Code.
                Exemplo: salve em /public/qrcodes/predio.png 
              */}
              <Image
                src="/qrcodes/predio.png"
                alt="QR Code oferta prédio próprio"
                width={240}
                height={240}
                className="w-52 h-52 object-contain"
              />
            </div>

            <p className="mt-3 text-xs text-slate-500 text-center max-w-xs">
              Abra o aplicativo do seu banco, escolha a opção de pagar por QR
              Code e aponte a câmera para o código. Toda oferta direcionada
              nessa campanha será usada na compra do nosso prédio próprio.
            </p>
          </div>
        </div>

        {/* rodapé da página de doação */}
        <div className="mt-10 text-center text-sm text-slate-500">
          <p>
            “Cada um contribua segundo propôs no seu coração; não com tristeza,
            ou por necessidade; porque Deus ama ao que dá com alegria.”
            <span className="italic"> (2 Coríntios 9:7)</span>
          </p>
        </div>
      </Container>
    </Section>
  );
}
