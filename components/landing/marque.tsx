"use client";

import { Marquee } from "@/components/ui/marquee";
import { Lock } from "lucide-react";

const N = "#0A1F3D";

const songDedications = [
  {
    from: "alexa",
    to: "emil",
    message: "wish i could forget how safe it felt being around you dulu",
    song: "Always",
    artist: "Daniel Caesar",
    cover: "https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a",
  },
  {
    from: null,
    to: "vanya",
    message: "funny how someone bisa jadi stranger padahal they knew all your secrets",
    song: "White Ferrari",
    artist: "Frank Ocean",
    cover: "https://i.scdn.co/image/ab67616d0000b2739b9b36b0e22870b9f542d937",
  },
  {
    from: "sarah",
    to: "marcel",
    message: "i still use the playlist u made pas aku sedih.. it still helps somehow",
    song: "Apocalypse",
    artist: "Cigarettes After Sex",
    cover: "https://i.scdn.co/image/ab67616d0000b273ef0d4234e1a645740f77d59c",
  },
  {
    from: null,
    to: "keyra",
    message: "tiap lewat coffee shop itu i wonder if u still remember our promises",
    song: "Someone To Spend Time With",
    artist: "Los Retros",
    cover: "https://i.scdn.co/image/ab67616d0000b2733d98ce55db4b9f5f9c2e3b3a",
  },
  {
    from: "ryan",
    to: "reza",
    message: "masih ada notes kita di gallery, full of plans yang ga pernah kejadian",
    song: "when was it over?",
    artist: "Sasha Alex Sloan",
    cover: "https://i.scdn.co/image/ab67616d0000b273c6e9e0b6b2c7b6f4b3d5e7a1",
  },
  {
    from: null,
    to: "nayla",
    message: "thank you for being my safe place through 2023.. even if we drifted",
    song: "SOUL LADY",
    artist: "YUKIKA",
    cover: "https://i.scdn.co/image/ab67616d0000b273b1c4e2d3f5a6b7c8d9e0f1a2",
  },
];

const firstRow = songDedications.slice(0, songDedications.length / 2);
const secondRow = songDedications.slice(songDedications.length / 2);

const SongCard = ({
  from,to,message,song,artist,cover,
}: {
  from: string | null;
  to: string;
  message: string;
  song: string;
  artist: string;
  cover: string;
}) => {
  return (
    <figure
      className="relative w-[300px] rounded-2xl overflow-hidden border bg-white flex flex-col"
      style={{
        borderColor: `${N}14`,
        boxShadow: `0 4px 20px ${N}0A`,
      }}
    >
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-[9px] font-bold uppercase tracking-widest shrink-0"
            style={{ color: `${N}45` }}
          >
            Untuk
          </span>
          <span className="text-[13px] font-bold truncate" style={{ color: N }}>
            {to}
          </span>
        </div>

        <div className="relative flex-1">
          <span
            className="absolute -left-1 -top-2 text-4xl font-serif select-none leading-none"
            style={{ color: `${N}0D` }}
          >
            "
          </span>
          <p
            className="text-[12px] leading-relaxed italic pl-2 line-clamp-3"
            style={{ color: `${N}CC` }}
          >
            {message}
          </p>
        </div>
        <div
          className="flex items-center gap-2.5 rounded-xl p-2.5 border mt-1"
          style={{
            background: `linear-gradient(135deg, ${N}06, #2B6CB010)`,
            borderColor: `${N}0E`,
          }}
        >
          <img
            src={cover}
            alt={song}
            className="w-9 h-9 rounded-lg object-cover shadow-sm shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Crect width='36' height='36' fill='%23D4DEF0' rx='8'/%3E%3C/svg%3E";
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold truncate" style={{ color: N }}>
              {song}
            </p>
            <p className="text-[9px] truncate mt-0.5" style={{ color: `${N}55` }}>
              {artist}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {from === null ? (
            <>
              <Lock className="w-3 h-3 shrink-0" style={{ color: `${N}40` }} />
              <span className="text-[10px] font-medium" style={{ color: `${N}45` }}>
                Dikirim secara anonim
              </span>
            </>
          ) : (
            <span className="text-[10px] font-medium" style={{ color: `${N}45` }}>
              Dari{" "}
              <span className="font-bold" style={{ color: N }}>
                {from}
              </span>
            </span>
          )}
        </div>

      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10 bg-white">
      <Marquee pauseOnHover className="[--duration:35s] mb-3">
        {firstRow.map((dedication, idx) => (
          <SongCard key={idx} {...dedication} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:35s]">
        {secondRow.map((dedication, idx) => (
          <SongCard key={idx} {...dedication} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}