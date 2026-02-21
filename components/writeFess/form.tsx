"use client";

import React, { useState, Suspense, useEffect,  } from "react";
import { Check, Lock, Send, AlertCircle, Music2, ChevronUp, ChevronDown } from "lucide-react";
import SongPickerList, { SelectedSong } from "@/components/writeFess/songPicker";
import PreviewCard from "@/components/writeFess/previewCard";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

const N = "#0A1F3D";

function FloatingInput({
  label, value, onChange, disabled = false, maxLength, error,
}: {
  label: string; value: string; onChange: (v: string) => void;
  disabled?: boolean; maxLength?: number; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || !!value || disabled;

  return (
    <div>
      <div
        className="relative rounded-xl border transition-all duration-200"
        style={{
          borderColor: error ? "#FCA5A5" : focused ? "#2B6CB0" : `${N}22`,
          background: disabled ? `${N}04` : "white",
        }}
      >
        <label
          className="absolute left-4 pointer-events-none select-none transition-all duration-200"
          style={{
            top: active ? "7px" : "50%",
            transform: active ? "none" : "translateY(-50%)",
            fontSize: active ? "10px" : "13px",
            color: active ? "#2B6CB0" : `${N}55`,
            fontWeight: active ? 700 : 400,
            letterSpacing: active ? "0.05em" : "normal",
          }}
        >
          {label}
        </label>
        <input
          type="text"
          value={value}
          maxLength={maxLength}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pt-6 pb-2.5 px-4 text-[14px] font-medium bg-transparent outline-none disabled:cursor-not-allowed"
          style={{ color: N }}
        />
      </div>
      {error && (
        <p className="flex items-center gap-1 mt-1 text-[11px] text-red-400 pl-1">
          <AlertCircle className="w-3 h-3" />{error}
        </p>
      )}
    </div>
  );
}


function AnonToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)} className="flex items-center gap-2.5">
      <div
        className="relative transition-all duration-200"
        style={{ width: 34, height: 20, borderRadius: 99, background: value ? "#2B6CB0" : `${N}22` }}
      >
        <motion.span
          animate={{ x: value ? 16 : 2 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="absolute top-[3px] w-3.5 h-3.5 rounded-full bg-white shadow-sm"
          style={{ display: "block" }}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <Lock className="w-3 h-3" style={{ color: value ? "#2B6CB0" : `${N}55` }} />
        <span className="text-[12px] font-semibold" style={{ color: value ? "#2B6CB0" : `${N}55` }}>
          Kirim sebagai anonim
        </span>
      </div>
    </button>
  );
}

function MessageWithSongIcon({
  message, onChange, charLimit, error,
  selectedSong, songPanelOpen, onToggleSong, onSelectSong, songError,
}: {
  message: string;
  onChange: (v: string) => void;
  charLimit: number;
  error?: string;
  selectedSong: SelectedSong | null;
  songPanelOpen: boolean;
  onToggleSong: () => void;
  onSelectSong: (s: SelectedSong) => void;
  songError?: string;
}) {
  const charLeft = charLimit - message.length;
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <p className="text-[11px] font-bold tracking-wide uppercase mb-2" style={{ color: `${N}55` }}>
        Pesan <span className="text-rose-400">*</span>
      </p>
      <div
        className="relative rounded-xl border overflow-hidden transition-all"
        style={{
          borderColor: error ? "#FCA5A5" : focused ? "#2B6CB0" : `${N}22`,
        }}
      >
        <div className="absolute top-3 right-3 z-10">
          <motion.button
            type="button"
            onClick={onToggleSong}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            title="Pilih lagu"
            className="relative flex items-center justify-center rounded-xl transition-all"
            style={{
              width: 36,
              height: 36,
              background: songPanelOpen
                ? "#2B6CB0"
                : selectedSong
                ? "#EBF4FF"
                : `${N}09`,
              border: selectedSong && !songPanelOpen ? "1.5px solid #2B6CB040" : "none",
            }}
          >
            {selectedSong && !songPanelOpen ? (
              <img
                src={selectedSong.cover}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <Music2
                className="w-4 h-4"
                style={{ color: songPanelOpen ? "white" : N }}
              />
            )}
            {selectedSong && !songPanelOpen && (
              <span
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "#2B6CB0", border: "1.5px solid white" }}
              >
                <Check className="w-2.5 h-2.5 text-white" />
              </span>
            )}
          </motion.button>

          {songError && !selectedSong && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-400" />
          )}
        </div>

     
        <textarea
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= charLimit) onChange(e.target.value);
          }}
          rows={7}
          placeholder="Tulis pesanmu di sini..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 pt-4 pb-3 pr-14 text-[14px] outline-none resize-none leading-relaxed bg-white"
          style={{ color: N }}
        />

  
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ background: `${N}04`, borderTop: `1px solid ${N}0C` }}
        >
          <div className="flex items-center gap-2">
            {error ? (
              <span className="flex items-center gap-1 text-[11px] text-red-400">
                <AlertCircle className="w-3 h-3" />{error}
              </span>
            ) : (
              <span >
              </span>
            )}
          </div>

      
          {selectedSong && (
            <button
              type="button"
              onClick={onToggleSong}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all"
              style={{ background: "#EBF4FF", color: "#2B6CB0" }}
            >
              <Music2 className="w-3 h-3" />
              <span className="max-w-[80px] truncate">{selectedSong.title}</span>
              {songPanelOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

          <span
            className="text-[11px] tabular-nums font-semibold ml-auto"
            style={{ color: charLeft < 30 ? "#F87171" : `${N}40` }}
          >
            {charLeft}/{charLimit}
          </span>
        </div>

       
        <AnimatePresence>
          {songPanelOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 300, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.26, ease: "easeInOut" }}
              className="overflow-hidden"
              style={{ borderTop: `1px solid #2B6CB025` }}
            >
              <div className="h-full pt-2 pb-1">
                <SongPickerList
                  selected={selectedSong}
                  onSelect={(song) => {
                    onSelectSong(song);
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

     
      {songError && !selectedSong && (
        <p className="flex items-center gap-1 mt-1 text-[11px] text-red-400 pl-1">
          <AlertCircle className="w-3 h-3" />{songError}
        </p>
      )}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.08 },
  }),
};


function FormInner() {
  const searchParams = useSearchParams();

  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [selectedSong, setSelectedSong] = useState<SelectedSong | null>(null);
  const [isAnon, setIsAnon] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songPanelOpen, setSongPanelOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const charLimit = 500;

  useEffect(() => {
    const id = searchParams.get("songId");
    const title = searchParams.get("songTitle");
    const artist = searchParams.get("songArtist");
    const cover = searchParams.get("songCover");
    if (id && title && artist && cover && !selectedSong) {
      setSelectedSong({ id, title, artist, cover });
    }
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!recipient.trim()) e.recipient = "Wajib diisi";
    if (!message.trim()) e.message = "Pesan tidak boleh kosong";
    if (!selectedSong) e.song = "Pilih lagu dulu ya";
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
    setRecipient(""); setSender(""); setMessage("");
    setSelectedSong(null); setIsAnon(false); setIsPlaying(false);
    setSongPanelOpen(false); setErrors({});
  };

  const songForPreview = selectedSong
    ? { id: selectedSong.id, title: selectedSong.title, artist: selectedSong.artist, cover: selectedSong.cover }
    : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-10 pb-16" style={{ overflow: "visible" }}>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="mb-10">
          <h1 className="text-[28px] font-bold leading-tight" style={{ color: N }}>
            Kirim perasaanmu
            <span style={{ color: "#2B6CB0" }}> lewat melodi.</span>
          </h1>
          <div className="mt-6 h-px" style={{ background: `${N}10` }} />
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start" style={{ alignItems: "start" }}>

           
           
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
              <div
                className="rounded-2xl border overflow-visible"
                style={{ borderColor: `${N}16`, boxShadow: `0 4px 32px ${N}09` }}
              >


                <div className="p-6 space-y-5">

                  <FloatingInput
                    label="Kepada *"
                    value={recipient}
                    onChange={(v) => { setRecipient(v); if (errors.recipient) setErrors(p => ({ ...p, recipient: "" })); }}
                    maxLength={50}
                    error={errors.recipient}
                  />

                  <div className="space-y-2.5">
                    <FloatingInput
                      label={isAnon ? "Dari — Anonim" : "Dari (opsional)"}
                      value={isAnon ? "" : sender}
                      onChange={setSender}
                      disabled={isAnon}
                      maxLength={50}
                    />
                    <AnonToggle value={isAnon} onChange={(v) => { setIsAnon(v); if (v) setSender(""); }} />
                  </div>

                
                  <div className="h-px" style={{ background: `${N}0D` }} />

                  <MessageWithSongIcon
                    message={message}
                    onChange={(v) => { setMessage(v); if (errors.message) setErrors(p => ({ ...p, message: "" })); }}
                    charLimit={charLimit}
                    error={errors.message}
                    selectedSong={selectedSong}
                    songPanelOpen={songPanelOpen}
                    onToggleSong={() => setSongPanelOpen(o => !o)}
                    onSelectSong={(song) => {
                      setSelectedSong(song);
                      setSongPanelOpen(false);
                      if (errors.song) setErrors(p => ({ ...p, song: "" }));
                    }}
                    songError={errors.song}
                  />

                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="hidden lg:block"
              style={{ position: "sticky", top: 32, alignSelf: "start" }}
            >
              <div className="space-y-5">

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background: `${N}10` }} />
                  <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: `${N}50` }}>
                    Pratinjau
                  </span>
                  <div className="h-px flex-1" style={{ background: `${N}10` }} />
                </div>

                <PreviewCard
                  recipient={recipient}
                  sender={sender}
                  message={message}
                  song={songForPreview}
                  isAnon={isAnon}
                  isPlaying={isPlaying}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                />

                   <motion.button
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.965 }}
                  type="submit"
                  className="w-full flex items-center justify-center py-4 rounded-xl font-bold text-[15px] text-white"
                  style={{
                    background: `linear-gradient(135deg, #1E4080 0%, ${N} 100%)`,
                    boxShadow: `0 6px 28px ${N}2E`,
                  }}
                >
                  Kirim Fess
                </motion.button>

                <p className="text-center text-[11px]" style={{ color: `${N}45` }}>
                  Fess akan tampil di koleksi setelah dikirim
                </p>
              </div>
            </motion.div>

          </div>

          <div className="lg:hidden mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-[15px] text-white"
              style={{
                background: `linear-gradient(135deg, #1E4080 0%, ${N} 100%)`,
                boxShadow: `0 6px 28px ${N}2E`,
              }}
            >
              <Send className="w-4 h-4" />
              Kirim Fess
            </motion.button>
          </div>

        </form>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="bg-white rounded-2xl px-10 py-10 text-center max-w-xs w-full"
              style={{ border: `1px solid ${N}12`, boxShadow: `0 24px 64px ${N}1A` }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 16 }}
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: "#EBF4FF" }}
              >
                <Check className="w-7 h-7" style={{ color: "#2B6CB0" }} />
              </motion.div>
              <h3 className="text-[18px] font-bold mb-2" style={{ color: N }}>Terkirim!</h3>
              <p className="text-sm leading-relaxed" style={{ color: `${N}70` }}>
                Pesanmu sudah masuk ke koleksi.<br />Semoga sampai ya!
              </p>
              <button
                onClick={handleReset}
                className="mt-6 text-[12px] font-semibold underline underline-offset-2 hover:opacity-60 transition-opacity"
                style={{ color: `${N}65` }}
              >
                Kirim fess lagi
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SongFessForm() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 rounded-full animate-spin"
          style={{ borderColor: `${N}18`, borderTopColor: N }} />
      </div>
    }>
      <FormInner />
    </Suspense>
  );
}