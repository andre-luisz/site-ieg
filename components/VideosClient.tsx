"use client";

import { useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";
import SkeletonCard from "./Skeleton";
import Modal from "./Modal";

type Item = { id: string; title: string; thumbnail: string; publishedAt: string };
type ApiResp = { items: Item[]; nextPageToken?: string | null; error?: string };

export default function VideosClient({ initialLimit = 9 }: { initialLimit?: number }) {
  const [videos, setVideos] = useState<Item[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const didInit = useRef(false);

  async function fetchPage(token?: string | null) {
    setLoading(true);
    setErr(null);
    try {
      const qs = new URLSearchParams();
      qs.set("limit", String(initialLimit));
      if (token) qs.set("pageToken", token);

      const res = await fetch(`/api/youtube?${qs.toString()}`);
      const data: ApiResp = await res.json();
      if (!res.ok || (data as any).error) throw new Error((data as any).error || "Erro");

      const incoming = data.items || [];
      setVideos((prev) => {
        const map = new Map<string, Item>(prev.map((it) => [it.id, it]));
        for (const it of incoming) if (!map.has(it.id)) map.set(it.id, it);
        return Array.from(map.values());
      });
      setNextPageToken(data.nextPageToken ?? null);
    } catch (e: any) {
      setErr(e.message || "Falha ao carregar vídeos.");
    } finally {
      setLoading(false);
      setFirstLoad(false);
    }
  }

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    fetchPage(null);
  }, []);

  const skeletonCount = firstLoad ? initialLimit : Math.min(3, initialLimit);
  const active = activeIndex != null ? videos[activeIndex] : null;

  const handlePrev = () => {
    if (activeIndex == null) return;
    setActiveIndex((i) => (i && i > 0 ? i - 1 : 0));
  };
  const handleNext = () => {
    if (activeIndex == null) return;
    setActiveIndex((i) => (i! < videos.length - 1 ? i! + 1 : i));
  };

  return (
    <div>
      {err && <p className="text-red-600">{err}</p>}

      <div className="sr-only" role="status" aria-live="polite">
  {active ? `Reproduzindo: ${active.title}` : ''}
</div>

      <div className="grid md:grid-cols-3 gap-6">
        {videos.map((v, idx) => (
          <VideoCard
            key={v.id}
            id={v.id}
            title={v.title}
            thumbnail={v.thumbnail}
            onPlay={() => setActiveIndex(idx)}
          />
        ))}
        {loading &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard key={`sk-${i}`} />
          ))}
      </div>

      <div className="mt-6 flex justify-center">
        {nextPageToken ? (
          <button
            className="rounded-2xl border border-slate-300 px-5 py-2.5 hover:border-blue-500 hover:text-blue-600 disabled:opacity-60"
            onClick={() => fetchPage(nextPageToken)}
            disabled={loading}
          >
            {loading ? "Carregando…" : "Carregar mais"}
          </button>
        ) : (
          !firstLoad && videos.length > 0 && (
            <p className="text-slate-500 text-sm">Fim da lista.</p>
          )
        )}
      </div>

      {/* Modal com navegação */}
      <Modal
        open={!!active}
        onClose={() => setActiveIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        canPrev={activeIndex != null && activeIndex > 0}
        canNext={activeIndex != null && activeIndex < videos.length - 1}
        ariaLabel={active?.title || "Player"}
      >
        {active && (
          <div className="aspect-video w-full">
            <iframe
  key={active.id}
  className="w-full h-full"
  src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0&cc_load_policy=1&hl=pt-BR`}
  title={active.title}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
/>
          </div>
        )}
      </Modal>
    </div>
  );
}
