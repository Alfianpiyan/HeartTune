import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "taylor swift";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=20`,
      { signal: controller.signal }
    );

    if (!res.ok) {
      throw new Error(`Deezer API error: ${res.status}`);
    }

    const json = await res.json();

    const data = (json.data ?? []).map((track: any) => ({
      id: track.id,
      title: track.title,
      link: track.link,
      preview: track.preview,
      artist: {
        id: track.artist?.id,
        name: track.artist?.name ?? "",
        link: track.artist?.link,
        picture: track.artist?.picture_medium,
      },
      album: {
        id: track.album?.id,
        title: track.album?.title ?? "",
        cover_small: track.album?.cover_small ?? "",
        cover_medium: track.album?.cover_medium ?? "",
        cover_big: track.album?.cover_big ?? "",
      },
    }));

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}