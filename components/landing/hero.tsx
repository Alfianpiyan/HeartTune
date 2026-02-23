"use client";
import { PenIcon, SearchIcon, HeartIcon, RefreshCw, Sparkles } from "lucide-react";
import { motion, AnimatePresence, } from "motion/react";
import { cn } from "@/lib/utils";
import { TypingAnimation } from "@/components/ui/typing-animation";
import React, { useState, useEffect } from "react";
import { getStepperSteps } from "@/components/landing/miniStepper";
import { MusicCard } from "@/components/landing/musicCard";
import { ChooseMusic } from "@/components/landing/chooseMusic";
import Link from "next/link";
import { supabase } from "@/lib/db";
import Image from "next/image";

function MiniStepper({ steps }: { steps: React.ReactNode[] }) {
  const [current, setCurrent] = useState(0);
  const isLast = current === steps.length - 1;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1 bg-[#0A1F3D]/8 rounded-full px-2 py-0.5">
          <Sparkles className="w-2.5 h-2.5 text-[#061025]/60" />
          <span className="text-[7px] font-semibold text-[#061025]/60 tracking-wide uppercase">
            Try it out
          </span>
        </div>
        <div className="flex items-center gap-1">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === current ? 16 : 5,
                backgroundColor:
                  i === current ? "#0A1F3D" : i < current ? "#1E3A5F" : "#D1D5DB",
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="h-full"
          >
            {steps[current]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#0A1F3D]/10">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className={cn(
            "px-2.5 py-1 rounded-md text-[9px] font-semibold transition-all",
            current === 0 ? "text-gray-300 cursor-not-allowed" : "text-[#0A1F3D] hover:bg-[#0A1F3D]/10"
          )}
        >
          Back
        </button>
        <span className="text-[8px] text-[#0A1F3D]/40 font-medium tabular-nums">
          {current + 1} / {steps.length}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => isLast ? setCurrent(0) : setCurrent((c) => c + 1)}
          className={cn(
            "px-2.5 py-1 rounded-md text-[9px] font-semibold flex items-center gap-1 transition-all",
            isLast
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-[#0A1F3D] text-white hover:bg-[#1E3A5F]"
          )}
        >
          {isLast ? (
            <><RefreshCw className="w-2.5 h-2.5" /> Again</>
          ) : (
            "Next →"
          )}
        </motion.button>
      </div>
    </div>
  );
}


function SocialProof() {
  const [fesses, setFesses] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const fetchFesses = async () => {
      const { data, error } = await supabase
        .from("tb_pesan")
        .select("music_cover, music_title, music_artist, pesan, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      if (!error && data) {
        setFesses(data);
      }
    };

    fetchFesses();
  }, []);

  useEffect(() => {
    if (fesses.length === 0) return;
    const timer = setInterval(() => {
      setIdx((p) => (p + 1) % fesses.length);
    }, 3400);

    return () => clearInterval(timer);
  }, [fesses]);

  if (fesses.length === 0) return null;

  const f = fesses[idx];

  return (
    <div className="mt-8 space-y-3 max-w-md">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold text-[#0A1F3D]/50 tracking-widest uppercase">
          Recently Sent
        </span>
      </div>

   <motion.div
  key={idx}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="relative flex gap-3 bg-layer-to-r from-[#E8EEF5] to-[#D4DEF0] rounded-xl border border-[#D4DEF0] px-3 py-3 overflow-hidden"
>
  <span className="absolute right-3 top-2 text-xl opacity-20 select-none text-[#0A1F3D]">
    ♪
  </span>

  {/* COVER */}
  <Image
    alt="cover"
    src={f.music_cover}
    width={44}
    height={44}
    className="rounded-lg object-cover shrink-0"
  />

  {/* CONTENT */}
  <div className="flex flex-col justify-center min-w-0">
    <div className="flex items-center gap-1.5 flex-wrap">
      <span
        className="text-[10px]  text-[#0A1F3D]/40 font-bold bg-clip-text truncate"
        style={{
          backgroundImage:
            "linear-layer(135deg, #0A1F3D 0%, #4A7FBD 100%)",
        }}
      >
        {f.music_title}
      </span>

      <span className="text-[8px] text-[#0A1F3D]/40">—</span>

      <span className="text-[8px] font-semibold text-[#0A1F3D]/60">
        {f.music_artist}
      </span>
    </div>

    <p className="text-[9px] text-[#0A1F3D]/60 italic truncate mt-1">
      "{f.pesan.slice(0, 50)}..."
    </p>
  </div>
</motion.div>

      <div className="flex items-center gap-2 pt-1">
        <span className="text-[9px] text-[#0A1F3D]/60">
          <span className="font-bold text-[#0A1F3D]">
            {fesses.length}+
          </span>{" "}
          melodies shared
        </span>
      </div>
    </div>
  );
}



type Song = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  preview: string;
};
export function Hero() {
 const [songs, setSongs] = useState<Song[]>([]);
const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");

 useEffect(() => {
  const fetchSong = async () => {
    try {
      const res = await fetch("/api/deezer?q=katty");
      const data = await res.json();

      if (data?.data?.length > 0) {
        const formatted = data.data.slice(0, 5).map((track: any) => ({
          id: track.id,
          title: track.title,
          artist: track.artist.name,
          cover: track.album.cover_medium,
          preview: track.preview,
        }));

        setSongs(formatted);
        setSelectedSong(formatted[0]); // default pilih pertama
      }
    } catch (err) {
      console.error("Failed fetching song", err);
    }
  };

  fetchSong();
}, []);

  const stepperSteps = getStepperSteps({
  message,
  setMessage,
  recipient,
  setRecipient,
  songs,
  selectedSong
});


  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap");
        .handwritten { font-family: "Homemade Apple", cursive; letter-spacing: 0.03em; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-18px); }
        }
        .music-note              { animation: float 3s ease-in-out infinite; }
        .music-note:nth-child(2) { animation-delay: 1s; }
        .music-note:nth-child(3) { animation-delay: 2s; }
        .music-note:nth-child(4) { animation-delay: 1.5s; }
      `}</style>

      <section className="relative pt-32 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-32 left-20  text-[#0A1F3D] opacity-5 text-4xl music-note">♪</div>
        <div className="absolute top-40 right-32 text-[#0A1F3D] opacity-5 text-5xl music-note">♫</div>
        <div className="absolute top-1/2 left-12 text-[#0A1F3D] opacity-5 text-4xl music-note">♬</div>
        <div className="absolute bottom-32 right-20 text-[#0A1F3D] opacity-5 text-5xl music-note">♪</div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 lg:pt-4"
            >
              <div className="mb-8 h-12 sm:h-13.75 lg:h-15">
                <TypingAnimation
                  className="handwritten text-2xl sm:text-3xl lg:text-4xl text-[#0A1F3D] leading-tight"
                  duration={80} delay={300}
                >
                  where melody meet emotion
                </TypingAnimation>
              </div>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="text-sm sm:text-base text-[#0A1F3D]/60 mt-3 mb-6 max-w-md leading-relaxed"
              >
                Pour your heart into a melody and let the rhythm carry your emotion.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link href="/write" className="group relative px-5 py-2.5 bg-[#0A1F3D] text-white rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-2 overflow-hidden transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    <PenIcon className="w-4 h-4" /> Write Your Melody
                  </span>
                  <div className="absolute inset-0 bg-layer-to-r from-[#1E3A5F] to-[#0A1F3D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link href="/browse" className="px-5 py-2.5 bg-white text-[#0A1F3D] border-2 border-[#0A1F3D] rounded-lg font-semibold text-sm hover:bg-[#F5F8FC] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  <SearchIcon className="w-4 h-4" /> Explore Collection
                </Link>
              </motion.div>

      
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4, duration: 0.8 }}
                className="w-full"
              >
                <SocialProof />
              </motion.div>
            </motion.div>

        
            <motion.div
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <style>{`
                .hide-scroll { scrollbar-width: none; }
                .hide-scroll::-webkit-scrollbar { display: none; }
              `}</style>
              <div className="grid grid-cols-5 gap-3" style={{ gridTemplateRows: "230px 148px" }}>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="col-start-1 col-span-2 row-start-1 bg-layer-to-br from-[#E8EEF5] to-[#D4DEF0] rounded-2xl border border-[#D4DEF0] p-3 shadow-sm overflow-hidden"
                >
                  <MiniStepper steps={stepperSteps} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                  className="col-start-3 col-span-3 row-start-1 row-span-2 rounded-2xl hide-scroll overflow-hidden"
                >
                  <ChooseMusic />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="col-start-1 col-span-2 row-start-2 bg-layer-to-br from-white to-gray-50 rounded-2xl border border-gray-50 p-3 shadow-sm overflow-hidden"
                >
           <MusicCard
  song={selectedSong?.title || "Loading..."}
  artist={selectedSong?.artist || ""}
  cover={selectedSong?.cover || "/images/default-cover.png"}
/>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}