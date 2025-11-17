import { NextResponse } from "next/server";

type YTItem = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
};

const API = "https://www.googleapis.com/youtube/v3";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Math.max(Number(searchParams.get("limit") || "9"), 1), 50);
  const pageToken = searchParams.get("pageToken") || undefined;

  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return NextResponse.json(
      { error: "Faltou configurar YOUTUBE_API_KEY e/ou YOUTUBE_CHANNEL_ID" },
      { status: 500 }
    );
  }

  const url = new URL(`${API}/search`);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", channelId);
  url.searchParams.set("order", "date");
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", String(limit));
  if (pageToken) url.searchParams.set("pageToken", pageToken);
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, {
    // cache de 10min no servidor
    next: { revalidate: 60 * 10 },
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: "Falha ao buscar YouTube", detail: text }, { status: 500 });
  }

  const data = await res.json();

  const items: YTItem[] = (data.items ?? []).map((it: any) => {
    const id = it.id?.videoId as string;
    const sn = it.snippet;
    return {
      id,
      title: sn?.title ?? "Vídeo",
      publishedAt: sn?.publishedAt ?? "",
      thumbnail:
        sn?.thumbnails?.high?.url ||
        sn?.thumbnails?.medium?.url ||
        sn?.thumbnails?.default?.url ||
        "",
      url: id ? `https://www.youtube.com/watch?v=${id}` : "",
    };
  });

  return NextResponse.json({
    items,
    nextPageToken: data.nextPageToken ?? null,
  });
}
