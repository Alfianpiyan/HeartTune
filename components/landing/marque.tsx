"use client";

import { Marquee } from "@/components/ui/marquee";
import { Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/db";
import { div } from "framer-motion/client";

interface DeezerTrack {
  id: number;
  title: string;
  preview: string;
  artist: { name: string };
  album: { cover_small: string; cover_medium: string };
}

const N = "#0A1F3D";

export function MarqueeDemo() {
  const [fesses, setFesses] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("tb_pesan")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (!error && data) {
        setFesses(data);
      }
    };

    fetchData();
  }, []);

  const firstRow = fesses.slice(0, fesses.length / 2);
  const secondRow = fesses.slice(fesses.length / 2);
  const SongCard = ({ item }: { item: any }) => {
  return (
    <figure
      className="relative w-70 rounded-2xl overflow-hidden border bg-white flex flex-col p-3"
      style={{
        borderColor: `${N}14`,
        boxShadow: `0 4px 20px ${N}0A`,
      }}
    >
      {/* Recipient */}
      <p className="text-sm font-bold" style={{ color: N }}>
        Untuk {item.nama_tujuan}
      </p>

      {/* Message */}
      <p
        className="text-xs italic line-clamp-2 mt-1 mb-3"
        style={{ color: `${N}70` }}
      >
        "{item.pesan}"
      </p>

      {/* Song */}
      <div className="flex items-center gap-2">
        <img
          src={item.music_cover}
          alt={item.music_title}
          className="w-12 h-12 rounded-lg object-cover"
        />

        <div className="flex flex-col min-w-0">
          <p className="text-[10px] font-bold truncate" style={{ color: N }}>
            {item.music_title}
          </p>
          <p className="text-xs truncate" style={{ color: `${N}55` }}>
            {item.music_artist}
          </p>
        </div>
      </div>

      {/* Sender */}
      <div className="mt-2 text-xs" style={{ color: `${N}55` }}>
        {item.nama_pengirim === "Anonim" ? (
          <div className="flex flex-row items-center gap-2">
              <Lock size={8}/>
            <span> Dikirim secara anonim</span>
          </div>
        ) : (
          <span>
            Dari <span style={{ color: N, fontWeight: 600 }}>
              {item.nama_pengirim}
            </span>
          </span>
        )}
      </div>
    </figure>
  );
};
  return (
  <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10 bg-white">

    <Marquee pauseOnHover className="[--duration:35s] mb-3">
      {firstRow.map((item) => (
        <SongCard key={item.id} item={item} />
      ))}
    </Marquee>

    <Marquee reverse pauseOnHover className="[--duration:35s]">
      {secondRow.map((item) => (
        <SongCard key={item.id} item={item} />
      ))}
    </Marquee>

  </div>
);
}