"use client";

import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface MusicCardProps {
  song?: string;
  artist?: string;
}

export function MusicCard({ song = "Unknown Song", artist = "Unknown Artist" }: MusicCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(32);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.4));
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);


  const totalSecs = 213; // 3:33
  const currentSecs = Math.floor((progress / 100) * totalSecs);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-2.5 h-full justify-between py-0.5">

      <div className="flex-1 min-h-0 flex flex-col justify-center">
        <span className="text-[11px] font-bold text-[#0A1F3D] truncate block leading-tight">{song}</span>
        <span className="text-[9px] text-[#0A1F3D]/40 truncate block mt-0.5">{artist}</span>
      </div>


      <div className="flex flex-col gap-1">
        <div
          className="relative w-full h-1 bg-[#0A1F3D]/10 rounded-full cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            setProgress(Math.min(100, Math.max(0, pct)));
          }}
        >
          <div
            className="h-full bg-gradient-to-r from-[#1E3A5F] to-[#4A7FBD] rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
          {/* thumb dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0A1F3D] rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 4px)` }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-[8px] text-[#0A1F3D]/30 tabular-nums">{fmt(currentSecs)}</span>
          <span className="text-[8px] text-[#0A1F3D]/30 tabular-nums">{fmt(totalSecs)}</span>
        </div>
      </div>

 
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setProgress((p) => Math.max(0, p - 10))}
          className="text-[#0A1F3D]/30 hover:text-[#0A1F3D] transition-colors"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full bg-[#0A1F3D] flex items-center justify-center hover:bg-[#1E3A5F] transition-colors shadow-md"
        >
          {isPlaying
            ? <Pause className="w-3.5 h-3.5 text-white" />
            : <Play className="w-3.5 h-3.5 text-white ml-0.5" />
          }
        </button>

        <button
          onClick={() => setProgress((p) => Math.min(100, p + 10))}
          className="text-[#0A1F3D]/30 hover:text-[#0A1F3D] transition-colors"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}