"use client";

import { useState, useEffect } from "react";
import { Music } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeezerTrack {
  id: number;
  title: string;
  artist: { name: string };
  album: { cover_small: string; cover_medium: string };
}

export function ChooseMusic() {
  const router = useRouter();
  const [tracks, setTracks] = useState<DeezerTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/deezer?q=taylor+swift");
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        if (!cancelled) setTracks(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Error fetching data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  const handlePickTrack = (track: DeezerTrack) => {
    const params = new URLSearchParams({
      songId: String(track.id),
      songTitle: track.title,
      songArtist: track.artist.name,
      songCover: track.album.cover_medium || track.album.cover_small,
    });
// ini buat arahin halaman ketika salag satu musik dipencet
    router.push(`/write?${params.toString()}`);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0A1F3D] to-[#1E3A5F] rounded-xl overflow-hidden">
      
      <style>{`
        .choose-scroll::-webkit-scrollbar { display: none; }
        .choose-scroll { scrollbar-width: none; }
      `}</style>

      <div className="shrink-0 px-4 pt-4 pb-3">
        <h1 className="text-[11px] font-bold text-white/90 tracking-widest uppercase">♪ Pilih Musik</h1>
        <p className="text-[9px] text-white/40 mt-0.5">Lagu yang cocok buat fess-mu</p>
      </div>
      <div className="choose-scroll flex-1 overflow-y-auto px-3 py-2">
        {loading ? (
          <div className="flex flex-col gap-2 pt-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-2 py-2 rounded-xl bg-white/5">
                <div className="w-9 h-9 rounded-lg bg-white/10 animate-pulse shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 bg-white/10 rounded-full animate-pulse w-3/5" />
                  <div className="h-2 bg-white/10 rounded-full animate-pulse w-2/5" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10 text-[10px] text-red-300">
            <div className="text-xl mb-2">⚠️</div>
            {error}
          </div>
        ) : tracks.length === 0 ? (
          <div className="text-center py-10">
            <Music size={24} className="mx-auto mb-2 text-white/20" />
            <p className="text-[10px] text-white/30">Lagu tidak ditemukan</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {tracks.map((track, index) => (
              <button
                key={track.id}
                onClick={() => handlePickTrack(track)}
                className="flex items-center gap-2.5 px-2 py-2 text-left w-full group rounded-xl transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
              >
               
                <span className="text-[9px] text-white/25 font-semibold w-4 text-center shrink-0 group-hover:hidden tabular-nums">
                  {index + 1}
                </span>

            
                <img
                  src={track.album.cover_medium || track.album.cover_small}
                  alt={track.title}
                  className="w-9 h-9 rounded-lg object-cover shrink-0 shadow-md ring-1 ring-white/10 bg-white/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Crect width='36' height='36' fill='%231E3A5F' rx='8'/%3E%3C/svg%3E";
                  }}
                />

                
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-white/90 truncate leading-tight">
                    {track.title}
                  </p>
                  <p className="text-[9px] text-white/40 truncate mt-0.5">
                    {track.artist.name}
                  </p>
                </div>

            
                <span className="text-white/15 group-hover:text-[#7EB8F7] transition-colors shrink-0 text-xs">
                  →
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

     
      <div className="shrink-0 h-6 bg-gradient-to-t from-[#1E3A5F] to-transparent pointer-events-none -mt-6" />
    </div>
  );
}