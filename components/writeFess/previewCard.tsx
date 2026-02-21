"use client";

import React from "react";
import {
  Sparkles,
  Eye,
  Lock,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  AlertCircle,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { Song } from "@/lib/song";

interface PreviewCardProps {
  recipient: string;
  sender?: string;     
  message: string;
  song: Song | null;
  isAnon: boolean;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const N = "#0A1F3D";

export default function PreviewCard({
  recipient,
  sender = "",
  message,
  song,
  isAnon,
  isPlaying,
  onTogglePlay,
}: PreviewCardProps) {
  const isEmpty = !recipient && !message && !song;

  const displaySender = isAnon ? null : sender.trim() || null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Eye className="w-3.5 h-3.5" style={{ color: `${N}50` }} />
        <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: `${N}50` }}>
          Preview Card
        </span>
        <div className="flex-1 h-px" style={{ background: `${N}10` }} />
        <span className="text-[9px]" style={{ color: `${N}40` }}>
          tampilan di halaman fess
        </span>
      </div>

      <motion.div
        layout
        className="relative rounded-2xl overflow-hidden border bg-white"
        style={{
          borderColor: `${N}14`,
          boxShadow: `0 4px 32px ${N}0C`,
        }}
      >
        <div
          className="h-1.5 w-full"
          style={{
            background: isEmpty
              ? "#E5E7EB"
              : `linear-gradient(90deg, ${N}, #2B6CB0, #7BA7D4)`,
          }}
        />

        <div className="p-5">
          {isEmpty ? (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: `${N}07` }}
              >
                <Sparkles className="w-5 h-5" style={{ color: `${N}30` }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: `${N}50` }}>
                  Isi form untuk preview
                </p>
                <p className="text-xs mt-0.5" style={{ color: `${N}35` }}>
                  Card-mu akan muncul di sini
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">

              {recipient && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-baseline gap-1.5"
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest shrink-0"
                    style={{ color: `${N}45` }}
                  >
                    Untuk
                  </span>
                  <span className="text-sm font-bold truncate" style={{ color: N }}>
                    {recipient}
                  </span>
                </motion.div>
              )}

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <span
                    className="absolute -left-1 -top-2 text-4xl font-serif select-none leading-none"
                    style={{ color: `${N}0D` }}
                  >
                    "
                  </span>
                  <p
                    className="text-[13px] leading-relaxed italic pl-2 line-clamp-5"
                    style={{ color: `${N}CC` }}
                  >
                    {message}
                  </p>
                  <span
                    className="absolute -bottom-3 right-0 text-4xl font-serif select-none leading-none"
                    style={{ color: `${N}0D` }}
                  >
                    "
                  </span>
                </motion.div>
              )}

              {song && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-3 rounded-xl p-3 border"
                  style={{
                    background: `linear-gradient(135deg, ${N}06, #2B6CB010)`,
                    borderColor: `${N}0E`,
                  }}
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-10 h-10 rounded-lg object-cover shadow-md shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: N }}>
                      {song.title}
                    </p>
                    <p className="text-[10px] truncate mt-0.5" style={{ color: `${N}60` }}>
                      {song.artist}
                    </p>
                    <div className="flex items-end gap-0.5 mt-1.5 h-3">
                      {[3, 5, 4, 6, 3, 5, 4, 6, 3, 5, 4, 3].map((h, i) => (
                        <motion.div
                          key={i}
                          className="w-1 rounded-full"
                          style={{ background: `${N}35` }}
                          animate={
                            isPlaying
                              ? { height: [`${h}px`, `${h + 4}px`, `${h}px`] }
                              : { height: `${h}px` }
                          }
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.07,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      className="w-5 h-5 flex items-center justify-center transition-opacity hover:opacity-60"
                      style={{ color: `${N}50` }}
                    >
                      <SkipBack className="w-3 h-3 fill-current" />
                    </button>
                    <button
                      onClick={onTogglePlay}
                      className="w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-opacity hover:opacity-80"
                      style={{ background: N }}
                    >
                      {isPlaying ? (
                        <Pause className="w-3 h-3 text-white fill-white" />
                      ) : (
                        <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                      )}
                    </button>
                    <button
                      className="w-5 h-5 flex items-center justify-center transition-opacity hover:opacity-60"
                      style={{ color: `${N}50` }}
                    >
                      <SkipForward className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 pt-1"
              >
                {isAnon ? (
                  <>
                    <Lock className="w-3 h-3" style={{ color: `${N}40` }} />
                    <span className="text-[10px] font-medium" style={{ color: `${N}45` }}>
                      Dikirim secara anonim
                    </span>
                  </>
                ) : displaySender ? (
                  <>
                    <User className="w-3 h-3" style={{ color: `${N}40` }} />
                    <span className="text-[10px] font-medium" style={{ color: `${N}45` }}>
                      Dari{" "}
                      <span className="font-bold" style={{ color: N }}>
                        {displaySender}
                      </span>
                    </span>
                  </>
                ) : null}
              </motion.div>

            </div>
          )}
        </div>

        {!isEmpty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-5 pb-4"
          >
            <span className="text-[9px]" style={{ color: `${N}35` }}>
              Siap dikirim ke koleksi fess
            </span>
          </motion.div>
        )}
      </motion.div>
      <div className="mt-3 flex items-start gap-2 rounded-xl px-3 py-2.5 border"
        style={{ background: "#FFFBEB", borderColor: "#FDE68A" }}
      >
        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[10px] text-amber-700 leading-relaxed">
          Pesan yang dikirim akan tampil publik. Pastikan tidak mengandung konten yang menyinggung.
        </p>
      </div>
    </div>
  );
}