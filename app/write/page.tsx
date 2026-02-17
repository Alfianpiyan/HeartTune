"use client";

import React, { useState, useRef, useEffect } from "react";
import {Music2,User,MessageSquare,Send,ChevronDown,Search,Check,Sparkles,Eye,Lock,Heart,SkipBack,SkipForward,Play,Pause,X,AlertCircle,} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";


const SONGS = [
  { id: "1",  title: "Perfect", artist: "Ed Sheeran", genre: "Pop",   cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=80&h=80&fit=crop" },
  { id: "2",  title: "All of Me",            artist: "John Legend",       genre: "Soul",  cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop" },
  { id: "3",  title: "A Thousand Years",     artist: "Christina Perri",   genre: "Pop",   cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=80&h=80&fit=crop" },
  { id: "4",  title: "Thinking Out Loud",    artist: "Ed Sheeran",        genre: "Pop",   cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop" },
  { id: "5",  title: "Lover",               artist: "Taylor Swift",      genre: "Pop",   cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop" },
  { id: "6",  title: "Die With A Smile",     artist: "Bruno Mars",        genre: "Pop",   cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=80&h=80&fit=crop" },
  { id: "7",  title: "Cinta Luar Biasa",     artist: "Andmesh",           genre: "Pop",   cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=80&h=80&fit=crop" },
];

type Song = (typeof SONGS)[number];

type FieldState = "idle" | "active" | "filled" | "error";

function useFieldState(value: string, required = true): FieldState {
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (value) setTouched(true);
  }, [value]);
  if (!touched) return "idle";
  if (required && !value) return "error";
  if (value) return "filled";
  return "idle";
}


function SongPicker({
  selected,
  onSelect,
}: {
  selected: Song | null;
  onSelect: (s: Song) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = SONGS.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.artist.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
    
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-left",
          open
            ? "border-[#1E3A5F] bg-white shadow-md"
            : selected
            ? "border-[#1E3A5F]/30 bg-[#F5F8FC]"
            : "border-gray-200 bg-white hover:border-[#1E3A5F]/40"
        )}
      >
        {selected ? (
          <>
            <img
              src={selected.cover}
              alt={selected.title}
              className="w-9 h-9 rounded-lg object-cover shrink-0 shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{selected.title}</p>
              <p className="text-xs text-gray-500 truncate">{selected.artist}</p>
            </div>
            <span className="text-[10px] font-semibold bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded-full shrink-0">
              {selected.genre}
            </span>
          </>
        ) : (
          <>
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <Music2 className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-sm text-gray-400">Pilih lagu untuk fess-mu...</span>
          </>
        )}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform shrink-0",
            open && "rotate-180"
          )}
        />
      </button>

      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full mt-2 left-0 right-0 z-50 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden"
          >
            
            <div className="p-2 border-b border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari judul atau artis..."
                  className="flex-1 text-xs bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                  autoFocus
                />
                {query && (
                  <button onClick={() => setQuery("")}>
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

          
            <div className="max-h-52 overflow-y-auto py-1.5 divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <div className="py-6 text-center text-xs text-gray-400">
                  Tidak ada lagu ditemukan
                </div>
              ) : (
                filtered.map((song) => (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => {
                      onSelect(song);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#F5F8FC] transition-colors text-left",
                      selected?.id === song.id && "bg-[#EEF3FA]"
                    )}
                  >
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-8 h-8 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{song.title}</p>
                      <p className="text-[10px] text-gray-500 truncate">{song.artist}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] font-medium bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                        {song.genre}
                      </span>
                      {selected?.id === song.id && (
                        <Check className="w-3.5 h-3.5 text-[#1E3A5F]" />
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


function PreviewCard({
  recipient,
  message,
  song,
  isAnon,
  isPlaying,
  onTogglePlay,
}: {
  recipient: string;
  message: string;
  song: Song | null;
  isAnon: boolean;
  isPlaying: boolean;
  onTogglePlay: () => void;
}) {
  const isEmpty = !recipient && !message && !song;

  return (
    <div className="sticky top-8">
      <div className="flex items-center gap-2 mb-3">
        <Eye className="w-3.5 h-3.5 text-[#1E3A5F]/50" />
        <span className="text-xs font-semibold text-[#1E3A5F]/50 tracking-wide uppercase">
          Preview Card
        </span>
        <div className="flex-1 h-px bg-[#1E3A5F]/10" />
        <span className="text-[9px] text-gray-400">tampilan di halaman fess</span>
      </div>

     
      <motion.div
        layout
        className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white"
      >
        <div
          className="h-1.5 w-full"
          style={{
            background: isEmpty
              ? "#E5E7EB"
              : "linear-gradient(90deg, #1E3A5F, #4A6FA5, #7BA7D4)",
          }}
        />

      
        <div className="p-5">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400">Isi form untuk preview</p>
                <p className="text-xs text-gray-300 mt-0.5">Card-mu akan muncul di sini</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {recipient && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    For
                  </span>
                  <span className="text-sm font-bold text-[#1E3A5F]">
                    {isAnon ? "Someone Special 🤫" : recipient}
                  </span>
                </motion.div>
              )}

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <span className="absolute -left-1 -top-2 text-4xl text-[#1E3A5F]/8 font-serif select-none leading-none">
                    "
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed italic pl-2 line-clamp-4">
                    {message}
                  </p>
                  <span className="absolute -bottom-3 right-0 text-4xl text-[#1E3A5F]/8 font-serif select-none leading-none">
                    "
                  </span>
                </motion.div>
              )}

              {song && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-3 bg-gradient-to-r from-[#F0F4FA] to-[#E8EEF8] rounded-xl p-3 border border-[#1E3A5F]/8"
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-10 h-10 rounded-lg object-cover shadow-md shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#1E3A5F] truncate">{song.title}</p>
                    <p className="text-[10px] text-gray-500 truncate">{song.artist}</p>
                   
                    <div className="flex items-end gap-0.5 mt-1.5 h-3">
                      {[3,5,4,6,3,5,4,6,3,5,4,3].map((h, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-[#1E3A5F]/30 rounded-full"
                          animate={isPlaying ? {
                            height: [`${h}px`, `${h + 4}px`, `${h}px`],
                          } : { height: `${h}px` }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.07,
                            ease: "easeInOut",
                          }}
                          style={{ height: `${h}px` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="w-5 h-5 flex items-center justify-center text-[#1E3A5F]/40 hover:text-[#1E3A5F] transition-colors">
                      <SkipBack className="w-3 h-3 fill-current" />
                    </button>
                    <button
                      onClick={onTogglePlay}
                      className="w-7 h-7 rounded-full bg-[#1E3A5F] flex items-center justify-center shadow-md hover:bg-[#2d5085] transition-colors"
                    >
                      {isPlaying
                        ? <Pause className="w-3 h-3 text-white fill-white" />
                        : <Play  className="w-3 h-3 text-white fill-white ml-0.5" />
                      }
                    </button>
                    <button className="w-5 h-5 flex items-center justify-center text-[#1E3A5F]/40 hover:text-[#1E3A5F] transition-colors">
                      <SkipForward className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </motion.div>
              )}

             
              {isAnon && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5 pt-1"
                >
                  <Lock className="w-3 h-3 text-gray-400" />
                  <span className="text-[9px] text-gray-400 font-medium">
                    Dikirim secara anonim
                  </span>
                </motion.div>
              )}
            </div>
          )}
        </div>

       
        {!isEmpty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-5 pb-4 flex items-center gap-1.5"
          >
            <Heart className="w-3 h-3 text-rose-300 fill-rose-300" />
            <span className="text-[9px] text-gray-400">
              Siap dikirim ke koleksi fess
            </span>
          </motion.div>
        )}
      </motion.div>

      <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200/60 rounded-xl px-3 py-2.5">
        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[10px] text-amber-700 leading-relaxed">
          Pesan yang dikirim akan tampil publik. Pastikan tidak mengandung konten yang menyinggung.
        </p>
      </div>
    </div>
  );
}

// ─── SUCCESS MODAL ────────────────────────────────────────────────────────────
function SuccessModal({ onClose, song, recipient }: {
  onClose: () => void;
  song: Song | null;
  recipient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
      >
        {/* animated heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-5"
        >
          <Heart className="w-9 h-9 fill-rose-400 text-rose-400" />
        </motion.div>

        <h3 className="text-xl font-black text-gray-900 mb-1">Fess Terkirim! 🎶</h3>
        <p className="text-sm text-gray-500 mb-5">
          Melody-mu sudah masuk ke koleksi
          {recipient && <span className="font-semibold text-[#1E3A5F]"> untuk {recipient}</span>}
        </p>

        {song && (
          <div className="flex items-center gap-3 bg-[#F5F8FC] rounded-2xl p-3 mb-6 text-left">
            <img src={song.cover} alt={song.title} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
            <div>
              <p className="text-xs font-bold text-[#1E3A5F]">{song.title}</p>
              <p className="text-[10px] text-gray-500">{song.artist}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl text-sm font-bold hover:bg-[#2d5085] transition-colors"
          >
            Kirim Lagi
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
          >
            Lihat Koleksi
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN FORM PAGE ───────────────────────────────────────────────────────────
export default function SongFessForm() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isAnon, setIsAnon] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const recipientState = useFieldState(recipient, false);
  const messageState = useFieldState(message, true);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!message.trim()) e.message = "Pesan tidak boleh kosong";
    if (!selectedSong) e.song = "Pilih lagu untuk fess-mu";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setRecipient("");
    setMessage("");
    setSelectedSong(null);
    setIsAnon(false);
    setIsPlaying(false);
    setErrors({});
  };

  const charLimit = 280;
  const charLeft = charLimit - message.length;

  return (
    <div
      className="min-h-screen bg-[#FAFBFC] py-12 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Homemade+Apple&display=swap");
        .handwritten { font-family: "Homemade Apple", cursive; }
        .field-ring:focus-within { box-shadow: 0 0 0 3px rgba(30,58,95,0.12); }
      `}</style>

      <div className="max-w-5xl mx-auto">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                Sampaikan perasaanmu lewat lagu. Isi form di bawah dan melody-mu akan
                langsung tampil di koleksi.
              </p>
            </div>

            {/* step indicator */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 shadow-sm">
              {[
                { n: 1, label: "Pesan" },
                { n: 2, label: "Lagu" },
                { n: 3, label: "Kirim" },
              ].map((step, i, arr) => (
                <React.Fragment key={step.n}>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black",
                        (step.n === 1 && message) || (step.n === 2 && selectedSong)
                          ? "bg-[#1E3A5F] text-white"
                          : step.n === 3
                          ? "bg-gray-100 text-gray-400"
                          : "bg-[#1E3A5F]/10 text-[#1E3A5F]/60"
                      )}
                    >
                      {(step.n === 1 && message) || (step.n === 2 && selectedSong) ? (
                        <Check className="w-2.5 h-2.5" />
                      ) : (
                        step.n
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-semibold",
                        step.n <= 2 ? "text-[#1E3A5F]/70" : "text-gray-400"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-6 h-px bg-gray-200" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── BODY ── */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* ── LEFT: FORM ── */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ── 1. RECIPIENT ── */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <div className="w-7 h-7 rounded-xl bg-[#1E3A5F]/8 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-[#1E3A5F]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Kepada Siapa?</p>
                  <p className="text-[10px] text-gray-400">Opsional · bisa diisi nama atau inisial</p>
                </div>
                {recipientState === "filled" && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="ml-auto w-5 h-5 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-green-600" />
                  </motion.div>
                )}
              </div>
              <div className="px-5 py-4 space-y-3">
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  disabled={isAnon}
                  placeholder="Nama, inisial, atau panggilan..."
                  maxLength={50}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border-2 text-sm transition-all duration-200 outline-none",
                    "placeholder:text-gray-400 font-medium",
                    isAnon
                      ? "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed"
                      : "border-gray-200 bg-white focus:border-[#1E3A5F] focus:shadow-[0_0_0_3px_rgba(30,58,95,0.08)]"
                  )}
                />

                {/* anon toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setIsAnon(!isAnon);
                    if (!isAnon) setRecipient("");
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all duration-200",
                    isAnon
                      ? "bg-[#1E3A5F]/6 border-[#1E3A5F]/20 text-[#1E3A5F]"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Lock className={cn("w-3.5 h-3.5", isAnon ? "text-[#1E3A5F]" : "text-gray-400")} />
                    <span className="text-xs font-semibold">Kirim sebagai anonim</span>
                  </div>
                  <div
                    className={cn(
                      "w-9 h-5 rounded-full transition-colors relative",
                      isAnon ? "bg-[#1E3A5F]" : "bg-gray-300"
                    )}
                  >
                    <motion.div
                      animate={{ x: isAnon ? 16 : 2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* ── 2. MESSAGE ── */}
            <div className={cn(
              "bg-white rounded-2xl border shadow-sm overflow-hidden transition-all",
              errors.message ? "border-red-300" : "border-gray-200"
            )}>
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <div className="w-7 h-7 rounded-xl bg-[#1E3A5F]/8 flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5 text-[#1E3A5F]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Pesan <span className="text-rose-400">*</span>
                  </p>
                  <p className="text-[10px] text-gray-400">Tuangkan perasaanmu di sini</p>
                </div>
                {messageState === "filled" && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="ml-auto w-5 h-5 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-green-600" />
                  </motion.div>
                )}
              </div>
              <div className="px-5 py-4">
                <textarea
                  value={message}
                  onChange={(e) => {
                    if (e.target.value.length <= charLimit) {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((p) => ({ ...p, message: "" }));
                    }
                  }}
                  placeholder="Contoh: Setiap kali lagu ini diputar, aku selalu ingat momen kita berdua..."
                  rows={5}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border-2 text-sm transition-all duration-200 outline-none resize-none leading-relaxed",
                    "placeholder:text-gray-400",
                    errors.message
                      ? "border-red-300 bg-red-50 focus:border-red-400"
                      : "border-gray-200 bg-white focus:border-[#1E3A5F] focus:shadow-[0_0_0_3px_rgba(30,58,95,0.08)]"
                  )}
                />
                <div className="flex items-center justify-between mt-2">
                  {errors.message ? (
                    <span className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </span>
                  ) : (
                    <span className="text-[10px] text-gray-400">Tulis yang tulus dari hati 💙</span>
                  )}
                  <span
                    className={cn(
                      "text-[10px] font-semibold tabular-nums",
                      charLeft < 30 ? "text-red-400" : charLeft < 80 ? "text-amber-500" : "text-gray-400"
                    )}
                  >
                    {charLeft} / {charLimit}
                  </span>
                </div>
              </div>
            </div>

            {/* ── 3. SONG ── */}
            <div className={cn(
              "bg-white rounded-2xl border shadow-sm overflow-hidden transition-all",
              errors.song ? "border-red-300" : "border-gray-200"
            )}>
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <div className="w-7 h-7 rounded-xl bg-[#1E3A5F]/8 flex items-center justify-center">
                  <Music2 className="w-3.5 h-3.5 text-[#1E3A5F]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Pilih Lagu <span className="text-rose-400">*</span>
                  </p>
                  <p className="text-[10px] text-gray-400">Lagu yang mewakili perasaanmu</p>
                </div>
                {selectedSong && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="ml-auto w-5 h-5 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-green-600" />
                  </motion.div>
                )}
              </div>
              <div className="px-5 py-4">
                <SongPicker
                  selected={selectedSong}
                  onSelect={(s) => {
                    setSelectedSong(s);
                    if (errors.song) setErrors((p) => ({ ...p, song: "" }));
                  }}
                />
                {errors.song && (
                  <span className="text-xs text-red-500 flex items-center gap-1 mt-2">
                    <AlertCircle className="w-3 h-3" /> {errors.song}
                  </span>
                )}
              </div>
            </div>

            {/* ── SUBMIT ── */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full relative flex items-center justify-center gap-2.5 py-2.5 rounded-xl",
                "text-white font-bold text-sm tracking-wide shadow-lg",
                "bg-gradient-to-r from-[#1E3A5F] to-[#4A6FA5]",
                "hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Send className="w-4 h-4" />
                Kirim Fess Sekarang
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A6FA5] to-[#1E3A5F] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* shimmer */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.button>

            <p className="text-center text-[10px] text-gray-400">
              Dengan mengirim, kamu setuju bahwa pesan ini akan tampil publik.
              Kolom bertanda <span className="text-rose-400 font-bold">*</span> wajib diisi.
            </p>
          </motion.form>

          {/* ── RIGHT: PREVIEW ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <PreviewCard
              recipient={recipient}
              message={message}
              song={selectedSong}
              isAnon={isAnon}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
            />
          </motion.div>
        </div>
      </div>

      {/* ── SUCCESS MODAL ── */}
      <AnimatePresence>
        {submitted && (
          <SuccessModal
            onClose={handleReset}
            song={selectedSong}
            recipient={isAnon ? "" : recipient}
          />
        )}
      </AnimatePresence>
    </div>
  );
}