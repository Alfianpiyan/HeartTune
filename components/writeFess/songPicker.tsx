"use client";

import React, { useState, useEffect } from "react";
import { Search, Check, X, Loader2 } from "lucide-react";

interface DeezerTrack {
  id: number;
  title: string;
  artist: { name: string };
  album: { cover_small: string; cover_medium: string };
}

export interface SelectedSong {
  id: string;
  title: string;
  artist: string;
  cover: string;
}

type Props = {
  selected: SelectedSong | null;
  onSelect: (s: SelectedSong) => void;
};

const N = "#0A1F3D";

export default function SongPickerList({ selected, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<DeezerTrack[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const term = query.trim() || "love";
    setLoading(true);

    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/deezer?q=${encodeURIComponent(term)}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!cancelled) {
          setTracks((data.data ?? []).slice(0, 20));
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }, 350);

    return () => { cancelled = true; clearTimeout(t); };
  }, [query]);

  const handleSelect = (track: DeezerTrack) => {
    onSelect({
      id: String(track.id),
      title: track.title,
      artist: track.artist.name,
      cover: track.album.cover_medium || track.album.cover_small,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pb-2.5">
        <div
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
          style={{ background: `${N}07`, border: `1px solid ${N}14` }}
        >
          <Search className="w-3.5 h-3.5 shrink-0" style={{ color: `${N}70` }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul atau artis..."
            className="flex-1 text-[13px] bg-transparent outline-none"
            style={{ color: N }}
            autoFocus
          />
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" style={{ color: `${N}50` }} />}
          {!loading && query && (
            <button type="button" onClick={() => setQuery("")}>
              <X className="w-3.5 h-3.5" style={{ color: `${N}50` }} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {!loading && tracks.length === 0 ? (
          <div className="py-8 text-center text-sm" style={{ color: `${N}50` }}>
            Lagu tidak ditemukan
          </div>
        ) : (
          <div className="space-y-0.5">
            {tracks.map((track) => {
              const isSel = selected?.id === String(track.id);
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => handleSelect(track)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                  style={{ background: isSel ? "#EBF4FF" : "transparent" }}
                  onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = `${N}05`; }}
                  onMouseLeave={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <img
                    src={track.album.cover_small}
                    alt={track.title}
                    className="w-9 h-9 rounded-lg object-cover shrink-0 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate" style={{ color: isSel ? "#1E4080" : N }}>
                      {track.title}
                    </p>
                    <p className="text-[11px] truncate mt-0.5" style={{ color: `${N}60` }}>
                      {track.artist.name}
                    </p>
                  </div>
                  {isSel && (
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "#2B6CB0" }}>
                      <Check className="w-3 h-3 text-white" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}