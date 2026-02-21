"use client";

import React from "react";
import { Music2 } from "lucide-react";
import { motion } from "framer-motion";

const N = "#0A1F3D";


interface FessItem {
  id: string;
  recipient: string;
  sender?: string | null;
  isAnon: boolean;
  message: string;
  song: {
    title: string;
    artist: string;
    cover: string;
  };
  createdAt: string;
}


function FessCard({ fess, index }: { fess: FessItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.05, ease: "easeOut" }}
      className="group bg-white rounded-2xl border overflow-hidden"
      style={{
        borderColor: `${N}12`,
        boxShadow: `0 2px 16px ${N}08`,
      }}
    >

      <div className="relative aspect-square overflow-hidden" style={{ background: `${N}07` }}>
        {fess.song.cover ? (
          <img
            src={fess.song.cover}
            alt={fess.song.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music2 className="w-8 h-8" style={{ color: `${N}25` }} />
          </div>
        )}


        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,31,61,0.72) 0%, transparent 55%)" }}
        />

        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
          <p className="text-white text-[12px] font-bold leading-tight truncate">
            {fess.song.title}
          </p>
          <p className="text-white/65 text-[10px] truncate mt-0.5">
            {fess.song.artist}
          </p>
        </div>
      </div>
      <div className="px-3.5 pt-3 pb-3.5 space-y-1.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[9px] font-bold uppercase tracking-widest shrink-0" style={{ color: `${N}45` }}>
            Untuk
          </span>
          <span className="text-[13px] font-bold truncate" style={{ color: N }}>
            {fess.recipient}
          </span>
        </div>
        <p className="text-[12px] leading-relaxed line-clamp-3" style={{ color: `${N}AA` }}>
          {fess.message}
        </p>
        <div
          className="flex items-center justify-between pt-2"
          style={{ borderTop: `1px solid ${N}09` }}
        >
          <span className="text-[10px]" style={{ color: `${N}40` }}>
            {fess.createdAt}
          </span>
          {!fess.isAnon && fess.sender && (
            <span >
               {fess.sender}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}


function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
     className="col-span-full flex flex-col items-center justify-center pt-16 pb-40 text-center"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center "
        style={{ background: `${N}07` }}
      >
        <Music2 className="w-7 h-7" style={{ color: `${N}28` }} />
      </div>
      <p className="text-[15px] font-bold mb-1" style={{ color: N }}>
        Belum ada momen
      </p>
      <p className="text-[13px]" style={{ color: `${N}55` }}>
        Fess yang kamu kirim akan muncul di sini.
      </p>
    </motion.div>
  );
}

export default function MomentsPage() {
  const fessList: FessItem[] = [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-10 pb-16">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-[26px] font-bold leading-tight" style={{ color: N }}>
            Moments
          </h1>
          <p className="text-[13px] mt-1" style={{ color: `${N}60` }}>
            Riwayat fess yang pernah kamu kirim.
          </p>
        </motion.div>

      
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {fessList.length === 0 ? (
            <EmptyState />
          ) : (
            fessList.map((fess, i) => (
              <FessCard key={fess.id} fess={fess} index={i} />
            ))
          )}
        </div>

      </div>
    </div>
  );
}