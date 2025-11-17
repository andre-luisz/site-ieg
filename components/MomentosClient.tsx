'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Music2,
  CalendarHeart,
  HeartHandshake,
  Users2,
  BookOpen,
  Home,
  Sparkles,
} from 'lucide-react';

type Categoria = {
  id: string;
  titulo: string;
  descricao: string;
  pasta: string;
  icon: React.ComponentType<{ className?: string }>;
};

type Foto = {
  url: string;
  nome: string;
};

const BASE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/momentos`;

const CATEGORIAS: Categoria[] = [
  {
    id: 'louvor',
    titulo: 'Louvor e Adoração',
    descricao: '🎶 Momentos de louvor, adoração e ministração no altar.',
    pasta: 'louvor',
    icon: Music2,
  },
  {
    id: 'cultos',
    titulo: 'Cultos e Celebrações',
    descricao: '📅 Registros de cultos, Santa Ceia, batismos e celebrações.',
    pasta: 'cultos',
    icon: CalendarHeart,
  },
  /*{
    id: 'acoes',
    titulo: 'Ações e Projetos',
    descricao: '🤝 Ações sociais e evangelismo.',
    pasta: 'acoes',
    icon: HeartHandshake,
  },*/
  {
    id: 'jovens',
    titulo: 'Juventude',
    descricao: '🧑‍🎤 Cultos de jovens, encontros e comunhão da juventude.',
    pasta: 'jovens',
    icon: Users2,
  },
  {
    id: 'ebd',
    titulo: 'Escola Bíblica Dominical',
    descricao: '📖 Momentos de ensino, comunhão e estudo da Palavra.',
    pasta: 'ebd',
    icon: BookOpen,
  },
  {
    id: 'cultos_domesticos',
    titulo: 'Cultos Domésticos',
    descricao: '🏠 Reuniões nos lares, células e pequenos grupos.',
    pasta: 'cultos_domesticos',
    icon: Home,
  },
  {
    id: 'encontro_com_deus',
    titulo: 'Encontro com Deus',
    descricao: '✨ Momentos especiais de restauração, fé e transformação.',
    pasta: 'encontro_com_deus',
    icon: Sparkles,
  },
];

type FotosPorCategoria = Record<string, Foto[]>;

function CategoriaCard({
  categoria,
  fotos,
}: {
  categoria: Categoria;
  fotos: Foto[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!fotos || fotos.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % fotos.length);
    }, 4000);
    return () => clearInterval(id);
  }, [fotos]);

  const atual = fotos[index];
  const Icon = categoria.icon;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
      {/* Banner de imagem com tamanho fixo e foto inteira */}
      <div className="relative w-full bg-slate-100 h-56 flex items-center justify-center">
        {atual ? (
          <>
            <img
              key={atual.url}
              src={atual.url}
              alt={atual.nome || categoria.titulo}
              className="w-full h-full object-contain fade-in"
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            <style jsx>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: scale(1.02);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }
              .fade-in {
                animation: fadeIn 0.7s ease-in-out;
              }
            `}</style>

            {/* badge */}
            <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-1 text-[10px] font-medium text-slate-700 shadow-sm">
              <Icon className="h-3 w-3" />
              <span>Momento</span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
            Sem fotos cadastradas ainda
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Icon className="h-4 w-4" />
          </span>
          <span>{categoria.titulo}</span>
        </h3>

        <p className="mt-2 text-sm text-slate-600 flex-1">
          {categoria.descricao}
        </p>

        {fotos.length > 1 && (
          <p className="mt-2 text-xs text-slate-500">
            Exibindo {index + 1} de {fotos.length} fotos
          </p>
        )}
      </div>
    </article>
  );
}

export default function MomentosClient() {
  const [fotosPorCategoria, setFotosPorCategoria] = useState<FotosPorCategoria>(
    {},
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;

    async function carregarFotos() {
      setLoading(true);
      const resultado: FotosPorCategoria = {};

      for (const cat of CATEGORIAS) {
        const { data, error } = await supabase.storage
          .from('momentos')
          .list(cat.pasta, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
          });

        if (error) {
          console.error(
            `Erro ao listar arquivos da pasta ${cat.pasta}:`,
            error,
          );
          resultado[cat.id] = [];
          continue;
        }

        const fotos: Foto[] = (data || [])
          .filter((item) => !item.name.endsWith('/'))
          .map((item) => ({
            nome: item.name,
            url: `${BASE_URL}/${cat.pasta}/${encodeURIComponent(item.name)}`,
          }));

        resultado[cat.id] = fotos;
      }

      if (!cancelado) {
        setFotosPorCategoria(resultado);
        setLoading(false);
      }
    }

    carregarFotos();

    return () => {
      cancelado = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CATEGORIAS.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 shadow-sm p-4 animate-pulse flex flex-col"
          >
            <div className="rounded-xl bg-slate-100 mb-3 h-56" />
            <div className="h-4 bg-slate-200 rounded w-2/3 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-full mb-1" />
            <div className="h-3 bg-slate-200 rounded w-5/6" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {CATEGORIAS.map((cat) => (
        <CategoriaCard
          key={cat.id}
          categoria={cat}
          fotos={fotosPorCategoria[cat.id] || []}
        />
      ))}
    </div>
  );
}
