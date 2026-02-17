"use client";
import {PenIcon,SearchIcon,HeartIcon,Play,Pause,SkipBack,SkipForward,Music,Mail,User,CheckCircle2,RefreshCw,Sparkles,} from "lucide-react";
import { motion, AnimatePresence, MotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { TypingAnimation } from "@/components/ui/typing-animation";
import React, {useState,useMemo,useEffect,ComponentPropsWithoutRef,} from "react";


function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0.8, opacity: 0, y: -8 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };
  return (
    <motion.div {...animations} layout className="w-full">
      {children}
    </motion.div>
  );
}

interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedList = React.memo(
  ({ children, className, delay = 1200, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );

    useEffect(() => {
      if (index < childrenArray.length - 1) {
        const t = setTimeout(() => setIndex((p) => p + 1), delay);
        return () => clearTimeout(t);
      }
    }, [index, delay, childrenArray.length]);

    const itemsToShow = useMemo(
      () => childrenArray.slice(0, index + 1).reverse(),
      [index, childrenArray]
    );

    return (
      <div className={cn("flex flex-col gap-1.5", className)} {...props}>
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);
AnimatedList.displayName = "AnimatedList";


function MiniStepper({ steps }: { steps: React.ReactNode[] }) {
  const [current, setCurrent] = useState(0);
  const isLast = current === steps.length - 1;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1 bg-[#1E3A5F]/8 rounded-full px-2 py-0.5">
          <Sparkles className="w-2.5 h-2.5 text-[#1E3A5F]/60" />
          <span className="text-[7px] font-semibold text-[#1E3A5F]/60 tracking-wide uppercase">
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
                  i === current
                    ? "#1E3A5F"
                    : i < current
                    ? "#4A6FA5"
                    : "#D1D5DB",
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

      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#1E3A5F]/10">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className={cn(
            "px-2.5 py-1 rounded-md text-[9px] font-semibold transition-all",
            current === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-[#1E3A5F] hover:bg-[#1E3A5F]/10"
          )}
        >
          Back
        </button>
        <span className="text-[8px] text-gray-400 font-medium tabular-nums">
          {current + 1} / {steps.length}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            isLast ? setCurrent(0) : setCurrent((c) => c + 1)
          }
          className={cn(
            "px-2.5 py-1 rounded-md text-[9px] font-semibold flex items-center gap-1 transition-all",
            isLast
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-[#1E3A5F] text-white hover:bg-[#2d5085]"
          )}
        >
          {isLast ? (
            <>
              <RefreshCw className="w-2.5 h-2.5" /> Again
            </>
          ) : (
            "Next →"
          )}
        </motion.button>
      </div>
    </div>
  );
}


const SAMPLE_MESSAGES = [
  {
    key: "m1",
    song: "Perfect - Ed Sheeran",
    msg: "Every note reminds me of you...",
    to: "Aira",
    color: "from-rose-50 to-pink-50",
    border: "border-rose-200/60",
    dot: "bg-rose-400",
  },
  {
    key: "m2",
    song: "All of Me - John Legend",
    msg: "You are my reason to smile each day.",
    to: "Anonymous",
    color: "from-blue-50 to-indigo-50",
    border: "border-blue-200/60",
    dot: "bg-blue-400",
  },
  {
    key: "m3",
    song: "A Thousand Years - Christina Perri",
    msg: "I have loved you for a thousand years.",
    to: "Reza",
    color: "from-violet-50 to-purple-50",
    border: "border-violet-200/60",
    dot: "bg-violet-400",
  },
  {
    key: "m4",
    song: "Thinking Out Loud - Ed Sheeran",
    msg: "Take me into your loving arms...",
    to: "Dinda",
    color: "from-amber-50 to-yellow-50",
    border: "border-amber-200/60",
    dot: "bg-amber-400",
  },
];

const RECENT_FESSES = [
  {
    song: "Lover",
    artist: "Taylor Swift",
    preview: "semoga kamu tahu ini untukmu 🌙",
    to: "someone special",
    time: "just now",
    color: "from-pink-50 to-rose-50",
    border: "border-pink-200/50",
    note: "♪",
    noteColor: "text-pink-300",
    badge: "bg-pink-100 text-pink-500",
  },
  {
    song: "Die With A Smile",
    artist: "Bruno Mars",
    preview: "rindu itu nyata, meski kamu tidak tahu",
    to: "anonymous",
    time: "2m ago",
    color: "from-violet-50 to-indigo-50",
    border: "border-violet-200/50",
    note: "♫",
    noteColor: "text-violet-300",
    badge: "bg-violet-100 text-violet-500",
  },
  {
    song: "Cinta Luar Biasa",
    artist: "Andmesh",
    preview: "tidak ada kata yang cukup, jadi kukirim ini",
    to: "someone",
    time: "5m ago",
    color: "from-emerald-50 to-teal-50",
    border: "border-emerald-200/50",
    note: "♬",
    noteColor: "text-emerald-300",
    badge: "bg-emerald-100 text-emerald-600",
  },
  {
    song: "A Thousand Years",
    artist: "Christina Perri",
    preview: "masih menunggu di lagu yang sama",
    to: "anonymous",
    time: "9m ago",
    color: "from-amber-50 to-yellow-50",
    border: "border-amber-200/50",
    note: "♪",
    noteColor: "text-amber-300",
    badge: "bg-amber-100 text-amber-500",
  },
  {
    song: "Rewrite The Stars",
    artist: "Zac Efron",
    preview: "andai bintang bisa menjawab doaku",
    to: "someone special",
    time: "14m ago",
    color: "from-sky-50 to-blue-50",
    border: "border-sky-200/50",
    note: "♫",
    noteColor: "text-sky-300",
    badge: "bg-sky-100 text-sky-500",
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
      animate={{
        opacity: phase === "in" ? 1 : 0,
        y: phase === "in" ? 0 : -8,
      }}
      transition={{ duration: 0.32, ease: "easeInOut" }}
      className={cn(
        "relative flex items-start gap-3 bg-gradient-to-r rounded-xl border px-3 py-2.5 overflow-hidden",
        f.color,
        f.border
      )}
    >
      
      <span className={cn("absolute right-3 top-2 text-xl opacity-40 select-none", f.noteColor)}>
        {f.note}
      </span>

      <div className={cn("mt-0.5 shrink-0 w-6 h-6 rounded-lg flex items-center justify-center", f.badge.replace("text-", "bg-").split(" ")[0] + "/20")}>
        <Music className={cn("w-3 h-3", f.badge.split(" ")[1])} />
      </div>

      <div className="flex-1 min-w-0 pr-6">
        {/* lagunya*/}
        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
          <span className="text-[9px] font-bold text-gray-800 truncate">{f.song}</span>
          <span className="text-[7px] text-gray-400">—</span>
          <span className={cn("text-[7px] font-semibold px-1.5 py-0.5 rounded-full", f.badge)}>
            {f.artist}
          </span>
        </div>
        <p className="text-[8px] text-gray-500 truncate italic">"{f.preview}"</p>
      </div>

      <span className="text-[7px] text-gray-400 shrink-0 font-medium self-start mt-0.5">{f.time}</span>
    </motion.div>
  );
}

function SocialProof() {
  
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((p) => (p + 1) % RECENT_FESSES.length);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 space-y-3">

     
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold text-gray-400 tracking-widest uppercase">
          Recently Sent
        </span>
       
        <div className="flex items-center gap-1">
          {RECENT_FESSES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === idx ? 14 : 4,
                backgroundColor: i === idx ? "#1E3A5F" : "#D1D5DB",
              }}
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
              <span
                key={i}
                className="text-[10px] text-[#1E3A5F]/20 font-bold"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                {note}
              </span>
            ))}
          </div>
          <span className="text-[9px] text-gray-500">
            <span className="font-bold text-[#1E3A5F]">1,000+</span> melodies shared
          </span>
        </div>

       
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeartIcon className="w-3 h-3 fill-rose-400 text-rose-400" />
          </motion.div>
          <span className="text-[8px] font-semibold text-rose-400">always growing</span>
        </div>
      </div>
    </div>
  );
}


export function Hero() {
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songName, setSongName] = useState("Perfect - Ed Sheeran");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  const songs = [
    "Perfect - Ed Sheeran",
    "All of Me - John Legend",
    "Thinking Out Loud - Ed Sheeran",
    "A Thousand Years - Christina Perri",
  ];

  const stepperSteps = [
    <div key="msg" className="flex flex-col h-full">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-5 h-5 rounded-md bg-[#1E3A5F]/10 flex items-center justify-center">
          <Mail className="w-3 h-3 text-[#1E3A5F]" />
        </div>
        <span className="text-[10px] font-bold text-[#1E3A5F]">
          Write your message
        </span>
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Pour your heart out..."
        className="flex-1 w-full px-2 py-1.5 text-[9px] border border-[#1E3A5F]/20 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]/40 resize-none leading-relaxed placeholder:text-gray-400"
      />
    </div>,

    <div key="to" className="flex flex-col h-full">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-5 h-5 rounded-md bg-[#1E3A5F]/10 flex items-center justify-center">
          <User className="w-3 h-3 text-[#1E3A5F]" />
        </div>
        <span className="text-[10px] font-bold text-[#1E3A5F]">
          Who is this for?
        </span>
      </div>
      <input
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient name..."
        className="w-full px-2 py-1.5 text-[9px] border border-[#1E3A5F]/20 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]/40 placeholder:text-gray-400"
      />
      <p className="text-[7px] text-[#4A6FA5]/70 mt-1.5">
        Leave blank to post anonymously
      </p>
    </div>,

    <div key="song" className="flex flex-col h-full">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-5 h-5 rounded-md bg-[#1E3A5F]/10 flex items-center justify-center">
          <Music className="w-3 h-3 text-[#1E3A5F]" />
        </div>
        <span className="text-[10px] font-bold text-[#1E3A5F]">
          Pick a melody
        </span>
      </div>
      <select
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        className="w-full px-2 py-1.5 text-[9px] border border-[#1E3A5F]/20 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]/40 text-gray-700"
      >
        {songs.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>
      <p className="text-[7px] text-[#4A6FA5]/70 mt-1.5">
        Choose the melody that fits your feeling
      </p>
    </div>,

    <div key="done" className="flex flex-col items-center justify-center h-full text-center gap-2">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        <CheckCircle2 className="w-9 h-9 text-green-500" />
      </motion.div>
      <div>
        <p className="text-[11px] font-bold text-gray-800">Message Delivered!</p>
        <p className="text-[8px] text-gray-500 mt-0.5">Now live in the collection</p>
      </div>
      <div className="w-full bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/60 rounded-lg px-2 py-1.5 text-left space-y-0.5">
        <p className="text-[8px] text-green-700 font-semibold flex items-center gap-1 truncate">
          <Music className="w-2.5 h-2.5 shrink-0" />
          {songName}
        </p>
        {recipient && (
          <p className="text-[7px] text-green-600 flex items-center gap-1">
            <User className="w-2.5 h-2.5 shrink-0" /> {recipient}
          </p>
        )}
        {message && (
          <p className="text-[7px] text-green-600/70 italic line-clamp-1">
            "{message}"
          </p>
        )}
      </div>
    </div>,
  ];

  const features = [
    { type: "stepper", className: "col-span-2", gradient: "from-[#E8EEF5] to-[#D4DEF0]" },
    { type: "browse", className: "col-span-1 row-span-2", gradient: "from-[#B8C9E0] to-[#A5BADB]" },
    { type: "music",  className: "col-span-2", gradient: "from-white to-gray-50" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFC]" style={{ fontFamily: "Nunito, sans-serif" }}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Homemade+Apple&display=swap");
        .handwritten { font-family: "Homemade Apple", cursive; letter-spacing: 0.03em; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-18px); }
        }
        .music-note                     { animation: float 3s ease-in-out infinite; }
        .music-note:nth-child(2)        { animation-delay: 1s; }
        .music-note:nth-child(3)        { animation-delay: 2s; }
        .music-note:nth-child(4)        { animation-delay: 1.5s; }
      `}</style>

      <section className="relative pt-32 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* bg notes */}
        <div className="absolute top-32 left-20  text-[#1E3A5F] opacity-5 text-4xl music-note">♪</div>
        <div className="absolute top-40 right-32 text-[#1E3A5F] opacity-5 text-5xl music-note">♫</div>
        <div className="absolute top-1/2 left-12 text-[#1E3A5F] opacity-5 text-4xl music-note">♬</div>
        <div className="absolute bottom-32 right-20 text-[#1E3A5F] opacity-5 text-5xl music-note">♪</div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* ── LEFT ── */}
            <motion.div
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 lg:pt-4"
            >
              <div className="mb-5 h-[50px] sm:h-[55px] lg:h-[60px]">
                <TypingAnimation
                  className="handwritten text-2xl sm:text-3xl lg:text-4xl text-[#1E3A5F] leading-tight"
                  duration={80} delay={300}
                >
                  where melody meet emotion
                </TypingAnimation>
              </div>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="text-sm sm:text-base text-gray-600 mb-6 max-w-md leading-relaxed"
              >
                Pour your heart into a melody and let the rhythm carry your emotion.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <button className="group relative px-5 py-2.5 bg-[#1E3A5F] text-white rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-2 overflow-hidden transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    <PenIcon className="w-4 h-4" /> Write Your Melody
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4A6FA5] to-[#1E3A5F] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <button className="px-5 py-2.5 bg-white text-[#1E3A5F] border-2 border-[#1E3A5F] rounded-lg font-semibold text-sm hover:bg-[#F5F8FC] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  <SearchIcon className="w-4 h-4" /> Explore Collection
                </button>
              </motion.div>

              {/* ── STATS ROW ── */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 0.8 }}
                className="mt-8 flex items-center gap-6"
              >
                
              </motion.div>

              {/* ── SOCIAL PROOF (replaces old stats bottom) ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4, duration: 0.8 }}
              >
                <SocialProof />
              </motion.div>
            </motion.div>

            {/* ── RIGHT: BENTO GRID ── */}
            <motion.div
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <div
                className="grid grid-cols-3 gap-3"
                style={{ gridTemplateRows: "230px 148px" }}
              >
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.15 }}
                    className={cn(
                      "group relative bg-gradient-to-br rounded-2xl border overflow-hidden",
                      feature.className,
                      feature.gradient,
                      feature.type === "browse"
                        ? "p-3 border-[#1E3A5F]/10"
                        : "p-3 border-gray-200 shadow-sm"
                    )}
                  >

                    {/* ══ STEPPER ══ */}
                    {feature.type === "stepper" && (
                      <MiniStepper steps={stepperSteps} />
                    )}

                    {/* ══ BROWSE ══ */}
                    {feature.type === "browse" && (
                      <div className="h-full flex flex-col gap-2">
                        <div className="flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-1 bg-white/40 rounded-full px-2 py-0.5">
                            <Sparkles className="w-2.5 h-2.5 text-[#1E3A5F]/60" />
                            <span className="text-[7px] font-semibold text-[#1E3A5F]/60 tracking-wide uppercase">
                              Preview
                            </span>
                          </div>
                          <SearchIcon className="w-3 h-3 text-[#1E3A5F]/40" />
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5 bg-white/70 border border-[#1E3A5F]/15 rounded-lg px-2 py-1.5">
                          <SearchIcon className="w-2.5 h-2.5 text-[#1E3A5F]/40 shrink-0" />
                          <span className="text-[8px] text-gray-400 truncate">
                            Search by name or song...
                          </span>
                        </div>

                        <div className="flex-1 min-h-0 overflow-hidden">
                          <AnimatedList delay={1400} className="gap-1.5">
                            {SAMPLE_MESSAGES.map((m) => (
                              <div
                                key={m.key}
                                className={cn(
                                  "w-full bg-gradient-to-r rounded-lg border px-2 py-1.5",
                                  m.color,
                                  m.border
                                )}
                              >
                                <div className="flex items-center gap-1 mb-0.5">
                                  <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", m.dot)} />
                                  <p className="text-[7px] font-bold text-gray-700 truncate leading-none">
                                    {m.song}
                                  </p>
                                </div>
                                <p className="text-[7px] text-gray-600 leading-relaxed line-clamp-1 pl-2.5">
                                  {m.msg}
                                </p>
                                <div className="flex items-center gap-1 mt-0.5 pl-2.5">
                                  <User className="w-2 h-2 text-gray-400 shrink-0" />
                                  <span className="text-[6px] text-gray-400">{m.to}</span>
                                </div>
                              </div>
                            ))}
                          </AnimatedList>
                        </div>
                      </div>
                    )}

                    
                    {feature.type === "music" && (
                      <div className="relative h-full flex flex-col justify-between">
                        <span className="absolute -left-1 top-1 text-gray-200 text-lg opacity-30 music-note">♪</span>
                        <span className="absolute -left-1 bottom-1 text-gray-200 text-xl opacity-20 music-note">♫</span>

                        <div className="flex items-center gap-2">
                          <div className="w-11 h-11 rounded-lg overflow-hidden shadow-md shrink-0">
                            <img
                              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop"
                              alt="Album"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-gray-900 truncate">Your Melody</p>
                            <p className="text-[8px] text-gray-500 truncate">Heartfelt Collection</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                            onClick={() => setLiked(!liked)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors shrink-0"
                          >
                            <HeartIcon className={cn("w-3.5 h-3.5 transition-colors", liked ? "fill-rose-500 text-rose-500" : "text-gray-400")} />
                          </motion.button>
                        </div>

                        <div>
                          <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-[#1E3A5F] to-[#4A6FA5] rounded-full"
                              initial={{ width: "33%" }}
                              animate={{ width: isPlaying ? "66%" : "33%" }}
                              transition={{ duration: 2 }}
                            />
                          </div>
                          <div className="flex justify-between mt-0.5">
                            <span className="text-[7px] text-gray-500">1:23</span>
                            <span className="text-[7px] text-gray-400">4:32</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-center gap-3">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                            <SkipBack className="w-3 h-3 text-gray-600 fill-gray-600" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-9 h-9 flex items-center justify-center bg-gradient-to-r from-[#1E3A5F] to-[#4A6FA5] rounded-full shadow-md hover:shadow-lg transition-all"
                          >
                            {isPlaying
                              ? <Pause className="w-4 h-4 text-white fill-white" />
                              : <Play  className="w-4 h-4 text-white fill-white ml-0.5" />
                            }
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                            <SkipForward className="w-3 h-3 text-gray-600 fill-gray-600" />
                          </motion.button>
                        </div>
                      </div>
                    )}

                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}