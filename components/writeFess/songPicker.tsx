"use client";

import React, { useState, useEffect } from "react";
import { Search, Check, X, Loader2, Play, Pause } from "lucide-react";

interface DeezerTrack {
  id: number;
  title: string;
  preview: string;
  artist: { name: string };
  album: { cover_small: string; cover_medium: string };
}


export interface SelectedSong {
  id: string;
  title: string;
  artist: string;
  cover: string;
  preview: string;
}

type Props = {
  selected: SelectedSong | null;
  playingId: string | null;
  isPlaying: boolean;
  onSelect: (s: SelectedSong) => void;
  onPreview: (s: SelectedSong) => void;
};

const N = "#0A1F3D";

export default function SongPickerList({ selected, onSelect, onPreview, isPlaying, playingId }: Props) {
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

        console.log(res.status);
        if (!res.ok) throw new Error();
        const data = await res.json();
        console.log("FULL DATA:", data);
        if (!cancelled) {
          setTracks((data.data ?? []).slice(0, 20));
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query]);

  const handleSelect = (track: DeezerTrack) => {
    onSelect({
      id: String(track.id),
      title: track.title,
      artist: track.artist.name,
      cover: track.album.cover_medium || track.album.cover_small,
      preview: track.preview,
    });
  };

  

  

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pb-2.5">
        <div
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
          style={{ background: `${N}07`, border: `1px solid ${N}14` }}
        >
          <Search
            className="w-3.5 h-3.5 shrink-0"
            style={{ color: `${N}70` }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul atau artis..."
            className="flex-1 text-[13px] bg-transparent outline-none"
            style={{ color: N }}
            autoFocus
          />
          {loading && (
            <Loader2
              className="w-3.5 h-3.5 animate-spin shrink-0"
              style={{ color: `${N}50` }}
            />
          )}
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
  const isPlayingThis = isPlaying && playingId === String(track.id);

  return (
    <div
      key={track.id}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl"
      style={{ background: isSel ? "#EBF4FF" : "transparent" }}
    >
      {/* PLAY BUTTON (PREVIEW ONLY) */}
      <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    onPreview({
      id: String(track.id),
      title: track.title,
      artist: track.artist.name,
      cover: track.album.cover_medium || track.album.cover_small,
      preview: track.preview,
    });
  }}
  className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 shrink-0"
>
 {isPlayingThis ? (
  <Pause size={12} style={{ color: `${N}50` }} />
) : (
  <Play size={12} style={{ color: `${N}50` }} />
)}
</button>

      {/* SELECT SONG */}
      <button
        type="button"
        onClick={() => handleSelect(track)}
        className="flex-1 flex items-center gap-3 text-left"
      >
        <img
          src={track.album.cover_small}
          className="w-9 h-9 rounded-lg object-cover shrink-0"
        />

        <div className="min-w-0">
          <p className="text-[13px] font-semibold truncate">
            {track.title}
          </p>
          <p className="text-[11px] truncate mt-0.5">
            {track.artist.name}
          </p>
        </div>
      </button>

      {isSel && (
        <span className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-600">
          <Check className="w-3 h-3 text-white" />
        </span>
      )}
    </div>
  );
})}
          </div>
        )}
      </div>
    </div>
  );
}
