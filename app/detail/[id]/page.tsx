"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/db";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Play, Pause } from "lucide-react";

type Pesan = {
  id: string;
  nama_pengirim: string;
  nama_tujuan: string;
  pesan: string;
  music_title: string;
  music_artist: string;
  music_cover: string;
  music_preview?: string; // optional
};

const N = "#0A1F3D";

export default function DetailPage() {
  const { id } = useParams();
  const { toggle, isPlaying, currentId } = useAudioPlayer();
  const [data, setData] = useState<Pesan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      const { data, error } = await supabase
        .from("tb_pesan")
        .select(`
          id,
          nama_pengirim,
          nama_tujuan,
          pesan,
          music_title,
          music_artist,
          music_cover,
          music_preview
        `)
        .eq("id", id)
        .single();

      if (!error) setData(data);
      setLoading(false);
    };

    fetchDetail();
  }, [id]);

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
        Loading message...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
        Message not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 pt-28 pb-32">
      <div className="max-w-xl mx-auto text-center space-y-10">

        {/* Greeting */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0A1F3D]">
            Hello, {data.nama_tujuan}
          </h1>
          <p className="text-sm text-[#0A1F3D]/50 mt-2 leading-relaxed">
            There's someone sending you a song they want you to hear :)
          </p>
        </div>

        {/* Music Card */}
        <div className="mx-auto max-w-md bg-[#0B1B34] rounded-2xl p-4 text-left shadow-lg">
          <p className="text-white text-sm font-semibold mb-3">
            Listen to the track preview
          </p>

          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-md overflow-hidden">
              <Image
                src={data.music_cover}
                alt={data.music_title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="text-white text-sm font-semibold">
                {data.music_title}
              </p>
              <p className="text-white/60 text-xs">
                {data.music_artist}
              </p>
            </div>

          <button
  onClick={() => data.music_preview && toggle(data.music_preview, data.id)}
  disabled={!data.music_preview}
  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-sm font-bold disabled:opacity-40"
>
  {isPlaying && currentId === data.id ? <Pause size={12} style={{ color: `${N}50` }}/> : <Play size={12} style={{ color: `${N}50` }}/>}
</button>
          </div>
        </div>

        {/* Message */}
        <div>
          <p className="text-sm text-[#0A1F3D]/50 mb-6">
            Also, here's a message from the sender:
          </p>

          <p
            className="text-[18px] leading-relaxed text-[#0A1F3D] whitespace-pre-line"
            style={{ fontFamily: "'Patrick Hand', cursive" }}
          >
            {data.pesan}
          </p>

          <p className="mt-10 text-sm text-[#0A1F3D]/40">
            — {data.nama_pengirim}
          </p>
        </div>
      </div>
    </div>
  );
}