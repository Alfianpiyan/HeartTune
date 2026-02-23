"use client";

import { useState, useEffect } from "react";
import { Music2, Copy, Check, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/db";
import { toast } from "sonner";
import Link from "next/link";

// ─── Constants ────────────────────────────────────────────────────────────────
const NAVY = "#0A1F3D";

// ─── Types ────────────────────────────────────────────────────────────────────
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

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getDeviceId = (): string | null => {
  if (typeof window === "undefined") return null;
  let id = localStorage.getItem("device_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("device_id", id);
  }
  return id;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function CopyButton({ id, onCopy }: { id: string; onCopy: (id: string) => void }) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCopy(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold tracking-wide uppercase transition-all duration-200"
      style={{
        color: copied ? "#16a34a" : `${NAVY}60`,
        background: copied ? "#dcfce7" : `${NAVY}07`,
      }}
      title="Salin link"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1"
          >
            <Check size={10} />
            Copied
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1"
          >
            <Copy size={10} />
            Salin
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function FessCard({
  fess,
  index,
  onCopy,
}: {
  fess: FessItem;
  index: number;
  onCopy: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "#fff",
        border: `1px solid ${NAVY}10`,
        boxShadow: `0 1px 3px ${NAVY}08, 0 4px 20px ${NAVY}05`,
      }}
    >
      {/* Cover art */}
      <Link href={`/detail/${fess.id}`} className="block">
        <div
          className="relative aspect-square overflow-hidden"
          style={{ background: `${NAVY}08` }}
        >
          {fess.song.cover ? (
            <img
              src={fess.song.cover}
              alt={fess.song.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music2 className="w-8 h-8" style={{ color: `${NAVY}25` }} />
            </div>
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${NAVY}CC 0%, ${NAVY}00 50%)`,
            }}
          />

          {/* Song info on cover */}
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
            <p className="text-white text-[11px] font-bold leading-tight truncate drop-shadow">
              {fess.song.title}
            </p>
            <p className="text-white/60 text-[10px] truncate mt-0.5 drop-shadow">
              {fess.song.artist}
            </p>
          </div>
        </div>

        {/* Card body */}
        <div className="px-4 pt-3.5 pb-3 flex flex-col gap-1.5">
          {/* Recipient */}
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-[9px] font-bold uppercase tracking-widest shrink-0"
              style={{ color: `${NAVY}45` }}
            >
              Untuk
            </span>
            <span
              className="text-[13px] font-bold truncate"
              style={{ color: NAVY }}
            >
              {fess.recipient}
            </span>
          </div>

          {/* Message */}
          <p
            className="text-[11.5px] leading-relaxed line-clamp-3"
            style={{ color: `${NAVY}80` }}
          >
            {fess.message}
          </p>
        </div>
      </Link>

      {/* Footer */}
      <div
        className="mt-auto flex items-center justify-between px-4 py-2.5"
        style={{ borderTop: `1px solid ${NAVY}08` }}
      >
        <span
          className="flex items-center gap-1 text-[10px]"
          style={{ color: `${NAVY}40` }}
        >
          <Clock size={9} />
          {fess.createdAt}
        </span>

        <CopyButton id={fess.id} onCopy={onCopy} />
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-full flex flex-col items-center justify-center py-28 text-center"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: `${NAVY}07` }}
      >
        <Music2 className="w-7 h-7" style={{ color: `${NAVY}30` }} />
      </div>
      <p className="text-[16px] font-bold mb-1" style={{ color: NAVY }}>
        Belum ada momen
      </p>
      <p className="text-[13px]" style={{ color: `${NAVY}55` }}>
        Fess yang kamu kirim akan muncul di sini.
      </p>
    </motion.div>
  );
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${NAVY}08` }}
    >
      <div className="aspect-square animate-pulse" style={{ background: `${NAVY}08` }} />
      <div className="p-4 space-y-2">
        <div className="h-3 w-2/3 rounded-full animate-pulse" style={{ background: `${NAVY}08` }} />
        <div className="h-2.5 w-full rounded-full animate-pulse" style={{ background: `${NAVY}06` }} />
        <div className="h-2.5 w-4/5 rounded-full animate-pulse" style={{ background: `${NAVY}06` }} />
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MomentsPage() {
  const [fessList, setFessList] = useState<FessItem[]>([]);
  const [loading, setLoading] = useState(true);

  const copyLink = (id: string) => {
    const link = `${window.location.origin}/detail/${id}`;
    navigator.clipboard.writeText(link);
    toast.success("Link disalin!");
  };

  useEffect(() => {
    const fetchMoments = async () => {
      const deviceId = getDeviceId();
      if (!deviceId) return;

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data, error } = await supabase
        .from("tb_pesan")
        .select("*")
        .gte("created_at", sevenDaysAgo.toISOString())
        .eq("device_id", deviceId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        toast.error("Gagal memuat data.");
      }

      if (data) {
        setFessList(
          data.map((item) => ({
            id: item.id,
            recipient: item.nama_tujuan,
            sender: item.nama_pengirim,
            isAnon: !item.nama_pengirim,
            message: item.pesan,
            song: {
              title: item.music_title,
              artist: item.music_artist,
              cover: item.music_cover,
            },
            createdAt: new Date(item.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          }))
        );
      }

      setLoading(false);
    };

    fetchMoments();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: `${NAVY}04` }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-12 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1.5"
                style={{ color: `${NAVY}50` }}
              >
                Riwayat
              </p>
              <h1
                className="text-[30px] font-black leading-none tracking-tight"
                style={{ color: NAVY }}
              >
                Moments
              </h1>
            </div>
            {!loading && fessList.length > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                style={{
                  background: `${NAVY}0C`,
                  color: `${NAVY}70`,
                }}
              >
                {fessList.length} fess · 7 hari terakhir
              </motion.span>
            )}
          </div>

          <div
            className="mt-5 h-px w-full"
            style={{ background: `linear-gradient(to right, ${NAVY}20, transparent)` }}
          />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} index={i} />)
          ) : fessList.length === 0 ? (
            <EmptyState />
          ) : (
            fessList.map((fess, i) => (
              <FessCard key={fess.id} fess={fess} index={i} onCopy={copyLink} />
            ))
          )}
        </div>

      </div>
    </div>
  );
}