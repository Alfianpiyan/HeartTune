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


const RECENT_FESSES = [
  {
    song: "Lover", artist: "Taylor Swift",
    preview: "semoga kamu tahu ini untukmu ",
    time: "just now",
  },
  {
    song: "Die With A Smile", artist: "Bruno Mars",
    preview: "rindu itu nyata, meski kamu tidak tahu",
    time: "2m ago",
  },
  {
    song: "Cinta Luar Biasa", artist: "Andmesh",
    preview: "tidak ada kata yang cukup, jadi kukirim ini",
    time: "5m ago",
  },
  {
    song: "A Thousand Years", artist: "Christina Perri",
    preview: "masih menunggu di lagu yang sama",
    time: "9m ago",
  },
  {
    song: "Rewrite The Stars", artist: "Zac Efron",
    preview: "andai bintang bisa menjawab doaku",
    time: "14m ago",
  },
];

function RecentFessTicker() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase("out");
      setTimeout(() => {
        setIdx((p) => (p + 1) % RECENT_FESSES.length);
        setPhase("in");
      }, 320);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  const f = RECENT_FESSES[idx];

  return (
    <motion.div
      key={idx}
      animate={{ opacity: phase === "in" ? 1 : 0, y: phase === "in" ? 0 : -8 }}
      transition={{ duration: 0.32, ease: "easeInOut" }}
      className="relative flex items-start gap-3 bg-gradient-to-r from-[#E8EEF5] to-[#D4DEF0] rounded-xl border border-[#D4DEF0] px-3 py-2.5 overflow-hidden"
    >
      {/* decorative note */}
      <span className="absolute right-3 top-2 text-xl opacity-20 select-none text-[#0A1F3D]">♪</span>

      <div className="flex-1 min-w-0 pr-6">
        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
          <span
            className="text-[9px] font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #0A1F3D 0%, #4A7FBD 100%)" }}
          >
            {f.song}
          </span>
          <span className="text-[7px] text-[#0A1F3D]/30">—</span>
          <span className="text-[7px] font-semibold text-[#0A1F3D]/55 bg-[#0A1F3D]/8 px-1.5 py-0.5 rounded-full">
            {f.artist}
          </span>
        </div>
        <p className="text-[8px] text-[#0A1F3D]/60 truncate italic">"{f.preview}"</p>
      </div>
      <span className="text-[7px] text-[#0A1F3D]/35 shrink-0 font-medium self-start mt-0.5">{f.time}</span>
    </motion.div>
  );
}

function SocialProof() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx((p) => (p + 1) % RECENT_FESSES.length), 3400);
    return () => clearInterval(timer);
  }, []);

  return (
  
    <div className="mt-8 space-y-3 max-w-md">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold text-[#0A1F3D]/50 tracking-widest uppercase">
          Recently Sent
        </span>
        <div className="flex items-center gap-1">
          {RECENT_FESSES.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === idx ? 14 : 4, backgroundColor: i === idx ? "#0A1F3D" : "#D1D5DB" }}
              transition={{ duration: 0.3 }}
              className="h-1 rounded-full"
            />
          ))}
        </div>
      </div>

      <RecentFessTicker />

      <div className="flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {["♪","♫","♬","♪","♫"].map((note, i) => (
              <span key={i} className="text-[10px] text-[#0A1F3D]/20 font-bold">
                {note}
              </span>
            ))}
          </div>
          <span className="text-[9px] text-[#0A1F3D]/60">
            <span className="font-bold text-[#0A1F3D]">1,000+</span> melodies shared
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
            <HeartIcon className="w-3 h-3 fill-rose-400 text-rose-400" />
          </motion.div>
          <span className="text-[8px] font-semibold text-rose-400">always growing</span>
        </div>
      </div>
    </div>
  );
}




export function Hero() {
  const [songName, setSongName] = useState("Perfect - Ed Sheeran");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  const songs = [
    "Perfect - Ed Sheeran",
    "All of Me - John Legend",
    "Thinking Out Loud - Ed Sheeran",
    "A Thousand Years - Christina Perri",
  ];

  const stepperSteps = getStepperSteps({
    message, setMessage,
    recipient, setRecipient,
    songName, setSongName,
    songs,
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
              <div className="mb-8 h-[50px] sm:h-[55px] lg:h-[60px]">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F] to-[#0A1F3D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                  className="col-start-1 col-span-2 row-start-1 bg-gradient-to-br from-[#E8EEF5] to-[#D4DEF0] rounded-2xl border border-[#D4DEF0] p-3 shadow-sm overflow-hidden"
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
                  className="col-start-1 col-span-2 row-start-2 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-50 p-3 shadow-sm overflow-hidden"
                >
                  <MusicCard song={songName} artist="Ed Sheeran" />
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}