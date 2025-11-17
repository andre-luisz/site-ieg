// lib/youtube.ts
const API = "https://www.googleapis.com/youtube/v3";

type YTVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
};

async function getChannelIdFromHandle(handle: string, apiKey: string) {
  // Tenta encontrar o canal pelo @handle
  const url = new URL(`${API}/search`);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", handle.startsWith("@") ? handle : `@${handle}`);
  url.searchParams.set("type", "channel");
  url.searchParams.set("maxResults", "1");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, { next: { revalidate: 60 * 60 } });
  if (!res.ok) throw new Error("Falha ao buscar canal pelo handle.");
  const data = await res.json();
  const item = data.items?.[0];
  return item?.id?.channelId as string | undefined;
}

export async function fetchLatestVideos(limit = 6): Promise<YTVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY!;
  if (!apiKey) throw new Error("YOUTUBE_API_KEY ausente no .env.local");

  // 1) tenta usar channelId do .env
  let channelId = process.env.YOUTUBE_CHANNEL_ID;

  // 2) se não tiver, tenta resolver pelo handle conhecido
  if (!channelId) {
    // seu handle:
    const handle = "@igrejadoevangelhodagraca";
    channelId = await getChannelIdFromHandle(handle, apiKey);
  }

  if (!channelId) {
    // sem channelId — devolve vazio para a página lidar com o fallback
    return [];
  }

  // Busca vídeos mais recentes do canal
  const url = new URL(`${API}/search`);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", channelId);
  url.searchParams.set("order", "date");
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", String(Math.min(Math.max(limit, 1), 50)));
  url.searchParams.set("key", apiKey);

  // cacheia por 30min em build/dev via Next fetch cache
  const res = await fetch(url, { next: { revalidate: 60 * 30 } });
  if (!res.ok) throw new Error("Falha ao buscar vídeos do YouTube.");

  const data = await res.json();
  const items = (data.items ?? []) as any[];

  return items.map((it) => {
    const id = it.id?.videoId as string;
    const sn = it.snippet;
    return {
      id,
      title: sn?.title ?? "Vídeo",
      publishedAt: sn?.publishedAt ?? "",
      thumbnail:
        sn?.thumbnails?.medium?.url ||
        sn?.thumbnails?.default?.url ||
        "",
      url: id ? `https://www.youtube.com/watch?v=${id}` : "",
    };
  });
}
